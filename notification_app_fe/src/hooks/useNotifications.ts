'use client';

import { useEffect, useState } from 'react';
import { Notification, NotificationResponse, fetchNotifications, fetchPriorityNotifications } from '@/lib/api';

interface UseNotificationsOptions {
  limit?: number;
  page?: number;
  notificationType?: string;
  priority?: boolean;
}

export const useNotifications = (options: UseNotificationsOptions = {}) => {
  const { limit = 10, page = 1, notificationType, priority = false } = options;
  
  const [data, setData] = useState<NotificationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = priority
          ? await fetchPriorityNotifications(limit, page)
          : await fetchNotifications(limit, page, notificationType);
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, page, notificationType, priority]);

  return { data, loading, error };
};
