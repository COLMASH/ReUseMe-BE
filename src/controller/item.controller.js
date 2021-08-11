const Item = require("../models/item.model");
const User = require("../models/user.model");

module.exports = {
  async list(req, res) {
    try {
      const item = await Item.find().populate("creator");
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async show(req, res) {
    try {
      const { userId } = req;
      const item = await Item.find({ creator: userId });
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { itemId } = req.body;
      const item = await Item.findByIdAndUpdate(itemId, req.body, {
        new: true,
      });
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { itemId } = req.body;
      const item = await Item.findByIdAndDelete(itemId);
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const { body, userId } = req;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      const item = await Item.create({ ...body, creator: userId });
      await User.updateOne({ _id: userId }, { $addToSet: { items: item._id } });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
