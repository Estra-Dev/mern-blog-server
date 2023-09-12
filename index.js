import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import route from "./routes/blog.js";
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: ["http://localhost:5173", ""]}))
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

app.listen(process.env.MONGOCONNECT || PORT, () => {
  console.log(`server automatically started on port ${PORT}`)
})