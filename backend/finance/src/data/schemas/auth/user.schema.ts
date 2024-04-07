import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { role } from '../../enums';

export const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    unique: [true, 'Email already exists'],
    validate: {
      validator: function (v: string) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(v);
      },
      message: `Please enter a valid email address`,
    },
  },
  studentId: {
    type: String,
    required: [true, 'studentId is required'],
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: [role.ADMIN, role.STUDENT, role.FACULTY],
    default: role.STUDENT,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model('User', UserSchema);
