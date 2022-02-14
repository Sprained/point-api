import * as mongoose from 'mongoose'

export const EmployeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies' },
  hours: String
}, {
  timestamps: true,
  collection: 'employees'
})