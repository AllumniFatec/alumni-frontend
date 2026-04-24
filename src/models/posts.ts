/** Payload para criar ou atualizar post (só texto). */
export interface PostContentPayload {
  post_id?: string;
  content: string;
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

/** Comentário no post (formato único da API: feed, perfil, respostas de CRUD). */
export interface PostComment {
  id: string;
  content: string;
  create_date: Date;
  user_id: string;
  user_name: string;
  user_perfil_photo?: string;
  user_status?: string;
  user_course_abbreviation?: string;
  user_course_enrollmentYear?: number;
}

/** Curtida no post (formato único da API). */
export interface PostLike {
  id: string;
  create_date: Date;
  user_id: string;
  user_name: string;
  user_perfil_photo?: string;
  user_status?: string;
  user_course_abbreviation?: string;
  user_course_enrollmentYear?: number;
}

/**
 * Post publicado — mesmo contrato em GET /feed, GET perfil e corpos de create/update.
 */
export interface Post {
  id: string;
  content: string;
  create_date: Date;
  images?: unknown[];
  user_id: string;
  user_name: string;
  user_perfil_photo?: string;
  user_status?: string;
  user_course_abbreviation?: string;
  user_course_enrollmentYear?: number;
  comments_count: number;
  likes_count: number;
  comments: PostComment[];
  likes: PostLike[];
}

export interface PostsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PostsListResponse {
  posts: Post[];
  pagination: PostsPagination;
}

export interface CreatePostResponse {
  message: string;
  post: Post;
}

export interface UpdatePostResponse {
  message: string;
  post: Post;
}

export interface DeleteCommentVariables {
  commentId: string;
}

export interface UpdateCommentVariables {
  commentId: string;
  content: string;
}

export interface PostCommentVariables {
  postId: string;
  content: string;
  userId: string;
  userName: string;
}
