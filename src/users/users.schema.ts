import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'

export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  status: { type: Boolean, default: true },
  confirmationToken: { type: String, maxlength: 36 },
  confirmationMail: { type: Boolean, default: false },
  recoverToken: { type: String, maxlength: 36 }
}, {
  timestamps: true,
  collection: 'users'
})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 8)
  next()
})