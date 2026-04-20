import {
  type InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { PostsApi } from "@/apis/posts";
import { createOptimisticId } from "@/lib/optimisticId";
import type { FeedResponse, Post, PostContentPayload } from "@/models";
import { toast } from "sonner";

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
  post: Post,
  userId: string,
  userName: string,
): Post {
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
    nextPosts[index] = postWithToggledLike(nextPosts[index], userId, userName);

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
    mutationFn: ({ postId }: PostLikeVariables) =>
      PostsApi.updatePostLike(postId),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEY });

      // Snapshot = copy of cache *before* the optimistic edit, so onError can restore it.
      const previousFeed =
        queryClient.getQueryData<InfiniteData<FeedResponse>>(FEED_QUERY_KEY);

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

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: PostContentPayload) => PostsApi.createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
      toast.success("Post criado com sucesso", {
        description: "Seu post foi criado com sucesso.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      toast.error("Erro ao criar post", {
        description: "Verifique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: PostContentPayload) => PostsApi.updatePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
      toast.success("Post atualizado com sucesso", {
        description: "Seu post foi atualizado com sucesso.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      toast.error("Erro ao atualizar post", {
        description: "Verifique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (postId: string) => PostsApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
      toast.success("Post deletado com sucesso", {
        description: "Seu post foi deletado com sucesso.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      toast.error("Erro ao deletar post", {
        description: "Verifique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useGetPostById(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["post", "detail", id],
    queryFn: () => PostsApi.getPostById(id),
    enabled: !!id,
  });

  return { data, isLoading, isError, refetch };
}
