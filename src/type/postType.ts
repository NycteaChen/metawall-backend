type PostDataType = {
  _id?: object | string;
  name: string;
  image?: string;
  content: string;
  likes?: number;
  comments?: number;
  createdAt?: Date;
  type?: string;
  tags?: string[];
};

export type PostType = PostDataType | null;
