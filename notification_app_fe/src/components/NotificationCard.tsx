'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { Notification } from '@/lib/api';
import { isNotificationRead, markNotificationAsRead } from '@/lib/notificationStore';

interface NotificationCardProps {
  notification: Notification;
  onMarkRead?: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead,
}) => {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const read = isNotificationRead(notification.id);
    setIsRead(read);
  }, [notification.id]);

  const handleMarkAsRead = () => {
    markNotificationAsRead(notification.id);
    setIsRead(true);
    onMarkRead?.(notification.id);
  };

  const getTypeColor = (type: string): 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
    switch (type) {
      case 'Event':
        return 'primary';
      case 'Result':
        return 'success';
      case 'Placement':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        opacity: isRead ? 0.7 : 1,
        borderLeft: `4px solid ${isRead ? '#ccc' : '#1976d2'}`,
        backgroundColor: isRead ? '#fafafa' : '#fff',
        transition: 'all 0.3s ease',
      }}
    >
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: isRead ? 'normal' : 'bold',
              }}
            >
              {notification.title}
            </Typography>
            {!isRead && (
              <Chip
                label="New"
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        }
        subheader={
          <Box display="flex" gap={1} alignItems="center" mt={0.5}>
            <Chip
              label={notification.type}
              size="small"
              color={getTypeColor(notification.type)}
              variant="outlined"
            />
            <Typography variant="caption" color="textSecondary">
              Priority: {notification.priority}
            </Typography>
          </Box>
        }
        action={
          <IconButton
            onClick={handleMarkAsRead}
            title={isRead ? 'Mark as unread' : 'Mark as read'}
            size="small"
          >
            {isRead ? (
              <MarkEmailReadIcon fontSize="small" />
            ) : (
              <MarkEmailUnreadIcon fontSize="small" />
            )}
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" paragraph>
          {notification.message}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="caption" color="textSecondary">
            Created: {formatDate(notification.createdAt)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Updated: {formatDate(notification.updatedAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
