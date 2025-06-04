// models/User.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  profileImage: {
    type: String,
    default: '',
  },
  secretKey: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
  collection: 'users', // equivalent to tableName in Sequelize
});

export default mongoose.model('User', userSchema);
