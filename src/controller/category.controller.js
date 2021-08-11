const Category = require("../models/category.model");

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      const category = await Category.create(body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json("Error registrando una categoría");
    }
  },

  async list(req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const { categoryId } = req.body;
      const category = await Category.findByIdAndDelete(categoryId);
      res.status(200).json(category);
    } catch (err) {
      res.status(400).json({ message: "Error eliminando los datos" });
    }
  },
};
