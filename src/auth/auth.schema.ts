import * as mongoose from 'mongoose'

export const RefreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  is_revoked: { type: Boolean, default: false },
  expires: Date
})