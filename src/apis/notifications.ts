import { apiBase } from "@/lib/axiosInstance";
import { NotificationsListResponse } from "@/models/notification";

export class NotificationApi {
  static async getNotifications(page = 1): Promise<NotificationsListResponse> {
    const response = await apiBase.get<NotificationsListResponse>(
      "/notification",
      { params: { page } },
    );
    return response.data;
  }

  static async markAsRead(id: string): Promise<void> {
    try {
      await apiBase.patch(`/notification/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
