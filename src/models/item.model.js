const { Schema, model, models } = require("mongoose");

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "'Title' field is required"],
    },
    category: {
      type: String,
      required: [true, "'Category' field is required"],
    },
    price: {
      type: Number,
      required: [true, "'Price' field is required"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: String,
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    messages: {
      type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    picture1: {
      type: String,
      default:
        "https://res.cloudinary.com/mashcol/image/upload/v1628703215/reuseme-images/imageIcon_rh1fag.png",
    },
    picture2: {
      type: String,
      default:
        "https://res.cloudinary.com/mashcol/image/upload/v1628703215/reuseme-images/imageIcon_rh1fag.png",
    },
    picture3: {
      type: String,
      default:
        "https://res.cloudinary.com/mashcol/image/upload/v1628703215/reuseme-images/imageIcon_rh1fag.png",
    },
    location: String,
  },
  {
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
