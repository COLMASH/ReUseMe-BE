const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { welcome } = require("../utils/mailer");
const User = require("../models/user.model");
const Item = require("../models/item.model");

module.exports = {
  async list(req, res) {
    try {
      const users = await User.find({}).select({ password: 0 });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async show(req, res) {
    try {
      const { userId } = req;
      const user = await User.findById(userId).populate({
        path: "suscribedItems",
        populate: { path: "creator" },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { userId, body } = req;
      const user = await User.findByIdAndUpdate(userId, body, { new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { userId } = req;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async signup(req, res) {
    try {
      const { body } = req;
      const user = await User.create(body);

      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      await welcome(user);

      res.status(201).json({
        token,
        user: {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid password or email");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid password or email");
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });

      res.status(201).json({
        token,
        user: {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async suscribeItem(req, res) {
    try {
      const { itemId } = req.body;
      const { userId } = req;
      let userInit = await User.findById(userId);
      if (userInit.suscribedItems.includes(itemId)) {
        res.status(200).json("already");
      } else {
        await User.updateOne(
          { _id: userId },
          { $addToSet: { suscribedItems: itemId } }
        );
        await Item.updateOne({ _id: itemId }, { $addToSet: { users: userId } });
        let user = await User.findById(userId).populate("items");
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async unsuscribeItem(req, res) {
    try {
      const { itemId } = req.body;
      const { userId } = req;
      await User.updateOne(
        { _id: userId },
        { $pull: { suscribedItems: itemId } }
      );
      await Item.updateOne({ _id: itemId }, { $pull: { users: userId } });
      const itemUnsuscribed = await Item.findById(itemId);
      res.status(200).json(itemUnsuscribed);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
