import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CommentsApi } from "@/apis/comments";
import { createOptimisticId } from "@/lib/optimisticId";
import type { FeedPost, FeedPostComment, FeedResponse } from "@/models";

const FEED_QUERY_KEY = ["feed"] as const;

export type PostCommentVariables = {
  postId: string;
  content: string;
  userId: string;
  userName: string;
};

type CommentMutationContext = {
  previousFeed: InfiniteData<FeedResponse> | undefined;
  variables: PostCommentVariables;
};

function optimisticComment(
  post: FeedPost,
  comment: FeedPostComment,
): FeedPost {
  return {
    ...post,
    comments: [comment, ...post.comments],
    comments_count: post.comments_count + 1,
  };
}

function feedWithNewComment(
  feed: InfiniteData<FeedResponse>,
  postId: string,
  comment: FeedPostComment,
): InfiniteData<FeedResponse> {
  const newPages = feed.pages.map((page) => {
    const index = page.posts.findIndex((p) => p.id === postId);
    if (index === -1) return page;

    const nextPosts = [...page.posts];
    nextPosts[index] = optimisticComment(nextPosts[index], comment);

    return { ...page, posts: nextPosts };
  });

  return { ...feed, pages: newPages };
}

export function usePostCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: PostCommentVariables) =>
      CommentsApi.createComment(postId, content),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEY });

      const previousFeed = queryClient.getQueryData<InfiniteData<FeedResponse>>(
        FEED_QUERY_KEY,
      );

      const comment: FeedPostComment = {
        id: createOptimisticId("optimistic-comment"),
        content: variables.content,
        create_date: new Date(),
        user_id: variables.userId,
        user_name: variables.userName,
      };

      queryClient.setQueryData<InfiniteData<FeedResponse>>(
        FEED_QUERY_KEY,
        (old) =>
          old ? feedWithNewComment(old, variables.postId, comment) : old,
      );

      return { previousFeed, variables } satisfies CommentMutationContext;
    },

    onError: (_err, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(FEED_QUERY_KEY, context.previousFeed);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
    },
  });
}
