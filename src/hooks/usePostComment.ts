import {
  type InfiniteData,
  type QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CommentsApi } from "@/apis/comments";
import { createOptimisticId } from "@/lib/optimisticId";
import type { FeedResponse, Post, PostComment } from "@/models";
import { PROFILE_QUERY_KEY } from "@/hooks/useProfile";
import { toast } from "sonner";

const FEED_QUERY_KEY = ["feed"] as const;

function invalidateFeedAndProfile(queryClient: QueryClient) {
  void queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY });
  void queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
}

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
  post: Post,
  comment: PostComment,
): Post {
  return {
    ...post,
    comments: [comment, ...post.comments],
    comments_count: post.comments_count + 1,
  };
}

function feedWithNewComment(
  feed: InfiniteData<FeedResponse>,
  postId: string,
  comment: PostComment,
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

      const comment: PostComment = {
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
      invalidateFeedAndProfile(queryClient);
    },
  });
}

export type UpdateCommentVariables = {
  commentId: string;
  content: string;
};

export function useUpdateCommentMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentVariables) =>
      CommentsApi.updateComment(commentId, content),
    onSuccess: () => {
      invalidateFeedAndProfile(queryClient);
      toast.success("Comentário atualizado", {
        description: "O comentário foi salvo com sucesso.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: (error) => {
      console.error("Error updating comment:", error);
      toast.error("Erro ao atualizar comentário", {
        description: "Tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export type DeleteCommentVariables = {
  commentId: string;
};

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, variables } = useMutation({
    mutationFn: ({ commentId }: DeleteCommentVariables) =>
      CommentsApi.deleteComment(commentId),
    onSuccess: () => {
      invalidateFeedAndProfile(queryClient);
      toast.success("Comentário excluído", {
        description: "O comentário foi removido.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      toast.error("Erro ao excluir comentário", {
        description: "Tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending, variables };
}
