import { apiBase } from "@/lib/axiosInstance";
import type {
  EventDetail,
  EventWritePayload,
  EventsListResponse,
} from "@/models/event";

export class EventApi {
  static async getEvents(page: number = 1): Promise<EventsListResponse> {
    try {
      const response = await apiBase.get<EventsListResponse>("/event", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }

  static async getEventById(id: string): Promise<EventDetail> {
    try {
      const response = await apiBase.get<EventDetail>(`/event/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw error;
    }
  }

  static async createEvent(
    data: EventWritePayload,
  ): Promise<{ message: string }> {
    try {
      console.log("Creating event:", data);
      const response = await apiBase.post<{ message: string }>("/event", data);
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  static async updateEvent(
    id: string,
    data: EventWritePayload,
  ): Promise<{ message: string }> {
    try {
      const response = await apiBase.put<{ message: string }>(
        `/event/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  }

  static async deleteEvent(id: string): Promise<{ message: string }> {
    try {
      const response = await apiBase.delete<{ message: string }>(
        `/event/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }

  static async closeEvent(id: string): Promise<{ message: string }> {
    try {
      const response = await apiBase.patch<{ message: string }>(
        `/event/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error closing event:", error);
      throw error;
    }
  }
}
