const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin.model");

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      const admin = await Admin.create(body);
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json("Error during administrator creation");
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
        throw new Error("Invalid password or email");
      }
      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        throw new Error("Invalid password or email");
      }
      const token = jwt.sign({ adminId: admin._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });

      res.status(201).json({
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          lastname: admin.lastname,
          email: admin.email,
          phone: admin.phone,
          profilePicture: admin.profilePicture,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
