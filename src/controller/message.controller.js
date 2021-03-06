const Message = require("../models/message.model");
const User = require("../models/user.model");
const Item = require("../models/item.model");

module.exports = {
  async list(req, res) {
    try {
      const message = await Message.find().populate("creator");
      res.status(200).json(message);
    } catch (error) {
      res.status(404).json({ errorMessage: error.message });
    }
  },

  async show(req, res) {
    try {
      const { userId } = req;
      const message = await Message.find({ creator: userId });
      res.status(200).json(message);
    } catch (error) {
      res.status(404).json({ errorMessage: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { messageId } = req.body;
      const message = await Message.findByIdAndDelete(messageId);
      console.log(message);
      res.status(200).json(message);
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  },

  async create(req, res) {
    try {
      const { itemId } = req.body;
      const { body, userId } = req;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User does not exist");
      }
      const message = await Message.create({
        ...body,
        creator: userId,
        item: itemId,
      });
      await Item.updateOne(
        { _id: itemId },
        { $addToSet: { messages: message._id } }
      );
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  },
};
