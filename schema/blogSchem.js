import { Schema } from "mongoose"

export const blogSchema = new Schema({
  title: {
    type: String,
    minLength: 3 ["title is too short"],
    required: true
  },
  content: {
    type: String,
    required: true,
    minLength: 5 ["content is too short"]
  },
  author: {
    type: String,
    required: true
  },
  date: String
})

export const userShema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})
