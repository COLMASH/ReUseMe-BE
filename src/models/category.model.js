const { Schema, model, models } = require("mongoose");

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "El nombre de la categoría es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);

module.exports = Category;
