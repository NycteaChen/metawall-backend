import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "貼文姓名未填寫"],
    },
    content: {
      type: String,
      required: [true, "內容未填寫"],
    },
    image: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
