import * as http from "http";
import { PostType } from "./type/postType";
const responseHandler = require("./responseHandler");
const Post = require("./model/posts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "././config.env" });

const DB = process.env.DATABASE?.replace(
  "<password>",
  process.env.DATABASE_PASSWORD || ""
);

mongoose
  .connect(DB)
  .then(() => console.log("資料庫連接成功"))
  .catch((error: unknown) => console.log(error));

const requestListener: http.RequestListener = async (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url === "/posts" && req.method === "GET") {
    try {
      const allPosts = await Post.find();
      responseHandler(res, 200, allPosts);
    } catch (error) {
      responseHandler(res, 500, []);
    }
  } else if (req.url === "/posts" && req.method === "POST") {
    req.on("end", async () => {
      try {
        const { name, content } = JSON.parse(body);
        await Post.create({
          name,
          content,
        });
        responseHandler(res, 200, await Post.find());
      } catch (error) {
        responseHandler(res, 400, [], error);
      }
    });
  } else if (req.url === "/posts" && req.method === "DELETE") {
    try {
      await Post.deleteMany({});
      responseHandler(res, 200, []);
    } catch {
      responseHandler(res, 500);
    }
  } else if (req.url?.startsWith("/posts/") && req.method === "DELETE") {
    try {
      const id: string = req.url?.split("/")?.pop() || "";
      const allPosts = (await Post.find()) || [];
      const target = allPosts.find(
        (e: PostType) => id && e._id?.valueOf() === id
      );
      if (target) {
        await Post.findByIdAndDelete(target?._id);
        responseHandler(res, 200, await Post.find());
      } else {
        responseHandler(res, 400);
      }
    } catch {
      responseHandler(res, 400);
    }
  } else if (req.url?.startsWith("/posts/") && req.method === "PATCH") {
    req.on("end", async () => {
      try {
        const { content } = JSON.parse(body);
        const id: string = req.url?.split("/")?.pop() || "";
        const allPosts = (await Post.find()) || [];
        const target = allPosts.find(
          (e: PostType) => id && e._id?.valueOf() === id
        );
        if (target && content) {
          await Post.findByIdAndUpdate(target._id, { $set: { content } });
          responseHandler(res, 200, await Post.find());
        } else {
          responseHandler(res, 400);
        }
      } catch {
        responseHandler(res, 400);
      }
    });
  } else if (req.url === "/posts" && req.method === "OPTIONS") {
    responseHandler(res, 200);
  } else {
    responseHandler(res, 404);
  }
};
const server = http.createServer(requestListener);
server.listen(process.env.PORT);
