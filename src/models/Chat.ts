import mongoose, { Schema, models, model } from 'mongoose';

const AttachmentSchema = new Schema({
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    url: { type: String },
  }, { _id: false });

const MessageSchema = new Schema({
    role: { type: String, required: true },
    content: { type: String, required: true },
    experimental_attachments: [AttachmentSchema],
  }, { _id: false });

const ChatSchema = new Schema({
  userId: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default models.Chat || model('Chat', ChatSchema);