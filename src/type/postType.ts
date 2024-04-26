type PostDataType = {
  user: object | string;
  content: string;
  _id?: object | string;
  image?: string;
  likes?: number;
  comments?: number;
  createdAt?: Date;
  type?: string;
  tags?: string[];
};

export type PostType = PostDataType | null;
