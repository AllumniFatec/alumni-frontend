import { Status } from "./users";
import { User } from "./users";

export interface PostLikes {
  like_id: string;
  post_id: string;
  user_id: string;
  create_date: Date;
}

export interface PostComments {
  comment_id: string;
  post_id: string;
  user_id: string;
  content: string;
  create_date: Date;
  updated_at?: Date;
  deleted_date?: Date;
}

export interface Post {
  post_id: string;
  content: string;
  images: Record<string, unknown>[];
  status: Status;
  author_id: string;
  author?: User;
  likes: PostLikes[];
  likes_count: number;
  comments: PostComments[];
  comments_count: number;
  create_date: Date;
  updated_at?: Date;
  deleted_date?: Date;
}

export interface CreatePost {
  content: string;
  images?: Record<string, unknown>[];
  author_id: string;
}

export interface UpdatePost {
  content?: string;
  images?: Record<string, unknown>[];
  status?: Status;
}

export interface LikePost {
  post_id: string;
  user_id: string;
}

export interface CommentPost {
  post_id: string;
  user_id: string;
  content: string;
}
