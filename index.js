import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import route from "./routes/blog.js";
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import "dotenv/config"
import path from "path"


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: ["http://localhost:5173", "https://mern-blog-app-9eh1.onrender.com"]}))
app.use("/", route)
app.use(cookieParser())

const PORT = process.env.PORT||3001

const secret = "fjosirvasefrAWpvpoerwieurjerirenbivpbvouyergfoerihn;sdvbuyr'we[q"


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, "../client/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"))
  })
}else {

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
}



app.listen(PORT, () => {
  console.log(`server automatically started on port ${process.env.PORT}`)
})