import { Schema, model } from 'mongoose';

const SnippetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ]
}, {
  timestamps: true,
});

export default model('Snippet', SnippetSchema);