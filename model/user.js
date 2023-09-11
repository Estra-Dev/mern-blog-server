import { model } from "mongoose";
import { blogSchema, userShema } from "../schema/blogSchem.js";

export const Blog = model("Blog", blogSchema)
export const User = model("User", userShema)
