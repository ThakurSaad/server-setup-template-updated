import { Schema, model, Types } from "mongoose";

interface IChat {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const chatSchema = new Schema<IChat>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Chat = model<IChat>("Chat", chatSchema);

export = Chat;
