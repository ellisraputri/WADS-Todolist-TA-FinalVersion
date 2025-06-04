// models/Todo.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  collection: 'todos',
});

export default mongoose.model('Todo', todoSchema);
