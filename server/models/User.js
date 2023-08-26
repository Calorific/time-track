import { Schema, model } from 'mongoose'

const recordSchema = new Schema({
  description: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true }
}, {
  timestamps: true
})

const projectSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: String,
  records: [recordSchema]
})

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  projectTypes: { type: [String], required: true },
  projects: [projectSchema],
  currentProject: String
}, {
  timestamps: true
})

const User = model('User', userSchema)

export default User