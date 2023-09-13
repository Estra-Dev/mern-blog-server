import express from "express"
const route = express.Router()
const app = express()

import { getPost, createPost, getPosts, deletePost, updatePost, getRegister, getLogin, getLogout} from "../routeController/blog.js"

route.get("/posts", getPosts)
route.post("/post", createPost)
route.get("/post/:id", getPost)
route.delete("/post/:id", deletePost)
route.patch("/post/:id", updatePost)
route.post("/register", getRegister)
route.post("/login", getLogin)
route.post("/logout", getLogout)

export default route