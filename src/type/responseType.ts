import { PostType } from "./postType";

export type ResponseType = {
  res: any;
  code: number;
  data?: PostType[] | PostType;
  error?: any;
};
