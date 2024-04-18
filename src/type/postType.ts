export type PostType = {
  _id?: string;
  name: string;
  image?: string;
  content: string;
  likes?: number;
  comments?: number;
  createdAt?: Date;
  type?: string;
  tags?: string[];
};
