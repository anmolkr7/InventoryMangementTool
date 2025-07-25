import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    minLength: [6, 'Username must be at least 6 characters long'],
    maxLength: [20, 'Username must be at most 20 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false, 
    minLength: [8, 'Password must be at least 8 characters long'],
  },
}, { timestamps: true });


userSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};


userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateJWT = function() {
  return jwt.sign(
    { id: this._id, username: this.username, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};


userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;