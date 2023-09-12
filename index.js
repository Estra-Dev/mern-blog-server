import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import route from "./routes/blog.js";
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import "dotenv/config"

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: ["https://mern-blog-app-gwcx.onrender.com"]}))
app.use("/", route)
app.use(cookieParser())

const PORT = 3001

const secret = "fjosirvasefrAWpvpoerwieurjerirenbivpbvouyergfoerihn;sdvbuyr'we[q"

app.get("/profile", (req, res) => {
  const {token} = req.cookies
  try {
    const info = jwt.verify(token, secret)
    res.json(info)
  } catch (error) {
    throw error
  }
})

app.get("/", (req, res) => {
  res.send("Welcome onboard")
})

app.listen(process.env.PORT||PORT, () => {
  console.log(`server automatically started on port ${process.env.PORT}`)
})