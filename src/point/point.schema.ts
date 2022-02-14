import * as mongoose from 'mongoose'
import { Type } from 'src/enums/point'

export const PointSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees' },
  loc: [Number],
  datetime: Date,
  type: { type: String, enum: Type }
}, {
  timestamps: true,
  collection: 'points'
})