import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { PostsApi } from "@/apis/posts";
import { createOptimisticId } from "@/lib/optimisticId";
import type { FeedPost, FeedResponse } from "@/models";

const FEED_QUERY_KEY = ["feed"] as const;

/** Variables passed to `mutate` (the API call only sends `postId`). */
export type PostLikeVariables = {
  postId: string;
  userId: string;
  userName: string;
};

type LikeMutationContext = {
  previousFeed: InfiniteData<FeedResponse> | undefined;
  variables: PostLikeVariables;
};

/**
 * Returns a copy of the post as if the user had toggled like:
 * if the user is already in `likes`, remove them; otherwise append and bump the count.
 */
function postWithToggledLike(
  post: FeedPost,
  userId: string,
  userName: string,
): FeedPost {
  const alreadyLiked = post.likes.some((like) => like.user_id === userId);

  if (alreadyLiked) {
    return {
      ...post,
      likes: post.likes.filter((like) => like.user_id !== userId),
      likes_count: Math.max(0, post.likes_count - 1),
    };
  }

  return {
    ...post,
    likes: [
      ...post.likes,
      {
        id: createOptimisticId("optimistic-like"),
        create_date: new Date(),
        user_id: userId,
        user_name: userName,
      },
    ],
    likes_count: post.likes_count + 1,
  };
}

/**
 * Feed cache is an infinite query: multiple pages, each with a `posts` array.
 * Find the post by `postId` and replace only that entry; everything else stays the same.
 */
function feedWithToggledLike(
  feed: InfiniteData<FeedResponse>,
  { postId, userId, userName }: PostLikeVariables,
): InfiniteData<FeedResponse> {
  const newPages = feed.pages.map((page) => {
    const index = page.posts.findIndex((p) => p.id === postId);

    if (index === -1) {
      return page;
    }

    const nextPosts = [...page.posts];
    nextPosts[index] = postWithToggledLike(
      nextPosts[index],
      userId,
      userName,
    );

    return { ...page, posts: nextPosts };
  });

  return { ...feed, pages: newPages };
}

/**
 * TanStack flow: cancel → snapshot → setQueryData → onError → onSettled.
 * Cache key is only `['feed']` (there is no per-post key like `['feed', postId]`).
 */
export function usePostLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: PostLikeVariables) => PostsApi.updatePostLike(postId),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEY });

      // Snapshot = copy of cache *before* the optimistic edit, so onError can restore it.
      const previousFeed = queryClient.getQueryData<InfiniteData<FeedResponse>>(
        FEED_QUERY_KEY,
      );

      queryClient.setQueryData<InfiniteData<FeedResponse>>(
        FEED_QUERY_KEY,
        (old) => (old ? feedWithToggledLike(old, variables) : old),
      );

      return { previousFeed, variables } satisfies LikeMutationContext;
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
