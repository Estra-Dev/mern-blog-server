import mongoose from "mongoose"
import { Blog, User } from "../model/user.js"
import "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



mongoose.connect(process.env.MONGOCONNECT).then(response => {
  console.log("MongoDB is connected")
}).catch(err => console.log("cannot connect", err))

//const salt = bcrypt.genSaltSync(10);
const secret = "fjosirvasefrAWpvpoerwieurjerirenbivpbvouyergfoerihn;sdvbuyr'we[q"

export const getPosts = async (req, res) => {
  try {
    const allPost = await Blog.find({})
    console.log(allPost)
    res.send(allPost)
  } catch (error) {
    console.log("could not find")
  }
}

export const createPost = async (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toLocaleTimeString()
  }

  try {
    await Blog.insertMany([newPost])
    res.send("Post added")
  } catch (error) {
    console.log("could not add", error)
  }
}

export const getPost = async (req, res) => {
  const id = req.params.id
  try {
    const searchedPost = await Blog.find({_id: id})
    console.log(searchedPost)
    res.send(searchedPost)
  } catch (error) {
    console.log("cannot get post", error)
  }
}

export const deletePost = async (req, res) => {
  const id = req.params.id
  try {
    await Blog.deleteOne({_id: id})
    res.send("Post deleted successfully")
  } catch (error) {
    console.log("could not delete", error)
  }
}

export const updatePost = async (req, res) => {
  const id = req.params.id
  const existingPost = Blog.find({_id: id})

  const updatedBlog = {
    _id: id,
    title: req.body.title || existingPost.title,
    content : req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: new Date().toLocaleTimeString()
  }

  try {
    await Blog.updateOne({_id: id}, {title: updatedBlog.title, content: updatedBlog.content, author: updatedBlog.author, date: updatedBlog.date})
    res.send("Post updated Successfully")
  } catch (error) {
    console.log("could not update", error)
  }
}

export const getRegister = async (req, res) => {
  const {username, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      username,
      password:hash
    })
    res.json(newUser)
  } catch (error) {
    res.status(400).json(error)
    console.log(error)
  }
}

export const getLogin = async (req, res) => {
  const {username, password} = req.body
  try {
    const userDoc = await User.findOne({username})
    const passOk = await bcrypt.compare(password, userDoc.password)
    if (passOk) {
      // logged in
      const token = await jwt.sign({username, id: userDoc._id}, secret)
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      })
      console.log(token)
    }else {
      res.status(400).json("Wrong credentials")
    }
    console.log(passOk)
  } catch (error) {
    console.log(error)
  }
}

export const getLogout = (req, res) => {
  res.cookie("token", "").json("ok")
}
