import { User } from "./users";

export interface PostAuthor {
  name: string;
  perfil_photo?: string;
}

export interface PostLikes {
  like_id: string;
  post_id: string;
  user_id: string;
  create_date: Date;
}
export enum PostStatus {
  ACTIVE = "Active",
  DELETED = "Deleted",
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
  status: PostStatus;
  author_id: string;
  author?: PostAuthor;
  likes: PostLikes[];
  likes_count: number;
  comments: PostComments[];
  comments_count: number;
  create_date: Date;
  updated_at?: Date;
  deleted_date?: Date;
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

export interface FeedPostComment {
  id: string;
  content: string;
  create_date: Date;
  user_id: string;
  user_name: string;
  user_perfil_photo?: string;
}

export interface FeedPostLike {
  id: string;
  create_date: Date;
  user_id: string;
  user_name: string;
}

export interface FeedPost {
  id: string;
  content: string;
  create_date: Date;
  user_id: string;
  user_name: string;
  user_perfil_photo?: string;
  user_course_abbreviation?: string;
  user_course_enrollmentYear?: number;
  comments_count: number;
  likes_count: number;
  comments: FeedPostComment[];
  likes: FeedPostLike[];
}
