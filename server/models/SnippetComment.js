import { Schema, model } from "mongoose";

const SnippetCommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  snippet: {
    type: Schema.Types.ObjectId,
    ref: 'Snippet',
    required: true,
  },
}, {
  timestamps: true,
});

export default model('SnippetComment', SnippetCommentSchema);