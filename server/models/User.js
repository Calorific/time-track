import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
})

const User = model('User', schema)

export default User