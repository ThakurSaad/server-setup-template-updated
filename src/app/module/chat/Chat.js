const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const chatSchema = new Schema(
  {
    participants: [
      {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
