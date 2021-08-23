const { Schema, model, models } = require("mongoose");

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "'Message' field is required"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
