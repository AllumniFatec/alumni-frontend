export interface ChatParticipantUser {
  user_id: string;
  name: string;
  perfil_photo: { url: string } | null;
}

export interface ChatListItem {
  chat_id: string;
  last_message: string | null;
  last_message_at: string | null;
  unreadCount: number;
  participants: { user: ChatParticipantUser }[];
}

export interface ChatsListPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ChatsListResponse {
  chats: ChatListItem[];
  pagination: ChatsListPagination;
}

export interface ChatMessage {
  message_id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  read_by: string[];
  created_at: string;
}

export interface ChatMessagesPagination {
  limit: number;
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ChatMessagesResponse {
  messages: ChatMessage[];
  pagination: ChatMessagesPagination;
}
