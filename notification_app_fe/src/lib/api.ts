import axios from 'axios';

const API_BASE_URL = '/api/notifications';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'Event' | 'Result' | 'Placement';
  priority: number;
  createdAt: string;
  updatedAt: string;
  read?: boolean;
}

export interface NotificationResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}

export const fetchNotifications = async (
  limit: number = 10,
  page: number = 1,
  notificationType?: string
): Promise<NotificationResponse> => {
  try {
    const params: Record<string, any> = { limit, page };
    if (notificationType) {
      params.notification_type = notificationType;
    }

    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const fetchPriorityNotifications = async (
  limit: number = 5,
  page: number = 1
): Promise<NotificationResponse> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { limit, page },
    });
    
    // Sort by priority in descending order and return top notifications
    const sortedData = response.data.data.sort(
      (a: Notification, b: Notification) => b.priority - a.priority
    );
    
    return {
      ...response.data,
      data: sortedData.slice(0, limit),
    };
  } catch (error) {
    console.error('Error fetching priority notifications:', error);
    throw error;
  }
};
