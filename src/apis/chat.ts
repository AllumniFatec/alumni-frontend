import { apiBase } from "@/lib/axiosInstance";
import type {
  ChatListItem,
  ChatsListResponse,
  ChatMessage,
  ChatMessagesResponse,
} from "@/models/chat";

export class ChatApi {
  /** `POST /chat/:targetUserId` — cria ou retorna DM existente (upsert). */
  static async startChat(targetUserId: string): Promise<ChatListItem> {
    const response = await apiBase.post<ChatListItem>(`/chat/${targetUserId}`);
    return response.data;
  }

  /** `GET /chat?page=` — lista de conversas paginada. */
  static async getChats(page: number = 1): Promise<ChatsListResponse> {
    const response = await apiBase.get<ChatsListResponse>("/chat", {
      params: { page },
    });
    return response.data;
  }

  /** `GET /chat/:chatId?lastmsg=` — mensagens com cursor-based pagination. */
  static async getMessages(
    chatId: string,
    lastmsg?: string | null,
  ): Promise<ChatMessagesResponse> {
    const response = await apiBase.get<ChatMessagesResponse>(
      `/chat/${chatId}`,
      {
        params: lastmsg ? { lastmsg } : undefined,
      },
    );
    return response.data;
  }

  /** `POST /chat/:chatId/message` — envio via HTTP (fallback). */
  static async sendMessage(
    chatId: string,
    content: string,
  ): Promise<ChatMessage> {
    const response = await apiBase.post<ChatMessage>(
      `/chat/${chatId}/message`,
      { content },
    );
    return response.data;
  }

  /** `PATCH /chat/:chatId/read` — marca todas as não-lidas como lidas. */
  static async markAsRead(
    chatId: string,
  ): Promise<{ message: string }> {
    const response = await apiBase.patch<{ message: string }>(
      `/chat/${chatId}/read`,
    );
    return response.data;
  }

  /** `GET /chat/unread` — total de mensagens não lidas do usuário. */
  static async getUnreadCount(): Promise<number> {
    const response = await apiBase.get<number>("/chat/unread");
    return response.data;
  }
}
