import mongoose, { Schema, models, model } from 'mongoose';

const MessageSchema = new Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
}, { _id: false });

const ChatSchema = new Schema({
  userId: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default models.Chat || model('Chat', ChatSchema);