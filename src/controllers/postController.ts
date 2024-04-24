import Post from "../models/postModel";
import responseHandler from "../utils/responseHandler";
import { PostType } from "../type/postType";

const PostApi = {
  getPosts: async (res: any) => {
    const data: PostType[] = await Post.find();
    responseHandler({ res, code: 200, data });
  },
  addPost: async (req: any, res: any) => {
    try {
      const { name, content } = req.body || {};

      const data: PostType = await Post.create({
        name: name.trim(),
        content: content.trim(),
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
