const { Schema, model, models } = require("mongoose");

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "'Category Name' field is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);

module.exports = Category;
