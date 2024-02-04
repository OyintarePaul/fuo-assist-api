import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    likes: { type: Number, min: 0, default: 0 },
    description: { type: String },
    faculty: { type: String, enum: ["SCI", "MGT", "ENG", "EDU", "SSC"] },
    html: { type: String },
    thumbnail: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export { Post };
