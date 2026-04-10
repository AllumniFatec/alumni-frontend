/** Item retornado em GET /notification */
export interface NotificationItem {
  notification_id: string;
  title: string;
  message: string;
  link: string;
  is_read: boolean;
}

export interface NotificationsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/** Envelope retornado por GET /notification */
export interface NotificationsListResponse {
  notifications: NotificationItem[];
  pagination: NotificationsPagination;
}
