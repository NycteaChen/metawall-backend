import Post from "../models/postModel";
require("../models/userModel");
import responseHandler from "../utils/responseHandler";
import { PostType } from "../type/postType";

const PostApi = {
  getPosts: async (req: any, res: any) => {
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt";
    const q = req.query.q ? { content: new RegExp(req.query.q) } : {};
    const data: PostType[] = await Post.find(q)
      .populate({
        path: "user",
        select: "name photo",
      })
      .sort(timeSort);
    responseHandler({ res, code: 200, data });
  },
  addPost: async (req: any, res: any) => {
    try {
      const { user, content, image } = req.body || {};

      const data: PostType = await Post.create({
        user,
        content: content.trim(),
        image: image.trim(),
      });
      responseHandler({ res, code: 200, data });
    } catch (error) {
      responseHandler({ res, code: 400, error });
    }
  },
  deletePosts: async (res: any) => {
    try {
      await Post.deleteMany({});
      responseHandler({ res, code: 200, data: [] });
    } catch {
      responseHandler({ res, code: 500 });
    }
  },
  deletePost: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      if (id) {
        await Post.findByIdAndDelete(id);
        responseHandler({ res, code: 200 });
      } else {
        responseHandler({ res, code: 400 });
      }
    } catch {
      responseHandler({ res, code: 400 });
    }
  },
  updatePost: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      if (content.trim() && id) {
        const data: PostType = await Post.findByIdAndUpdate(id, {
          $set: { content: content.trim() },
        });
        responseHandler({ res, code: 200, data });
      } else {
        responseHandler({ res, code: 400 });
      }
    } catch {
      responseHandler({ res, code: 400 });
    }
  },
};

export default PostApi;
