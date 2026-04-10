import { apiBase } from "@/lib/axiosInstance";
import { NotificationsListResponse } from "@/models/notification";

export class NotificationApi {
  static async getNotifications(
    page = 1,
    limit = 10,
  ): Promise<NotificationsListResponse> {
    const response = await apiBase.get<NotificationsListResponse>(
      "/notification",
      { params: { page, limit } },
    );
    return response.data;
  }

  static async markAsRead(id: string): Promise<void> {
    await apiBase.patch(`/notification/${id}`);
  }
}
