'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Stack,
  TextField,
  Pagination,
  Typography,
} from '@mui/material';
import Navigation from '@/components/Navigation';
import NotificationCard from '@/components/NotificationCard';
import { useNotifications } from '@/hooks/useNotifications';

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [notificationType, setNotificationType] = useState<string>('');
  const [readCount, setReadCount] = useState(0);

  const { data, loading, error } = useNotifications({
    limit,
    page,
    notificationType: notificationType || undefined,
  });

  const handleNotificationRead = (id: string) => {
    setReadCount(prev => prev + 1);
  };

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handleTypeChange = (event: any) => {
    setNotificationType(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 1;
  const unreadCount = data
    ? data.data.filter(n => !n.read).length
    : 0;

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            All Notifications
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Total: {data?.total || 0} | Unread: {unreadCount}
          </Typography>

          {/* Filters */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 2,
              mb: 3,
            }}
          >
            <FormControl size="small">
              <InputLabel>Notification Type</InputLabel>
              <Select
                value={notificationType}
                onChange={handleTypeChange}
                label="Notification Type"
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Event">Event</MenuItem>
                <MenuItem value="Result">Result</MenuItem>
                <MenuItem value="Placement">Placement</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Limit</InputLabel>
              <Select
                value={limit}
                onChange={handleLimitChange}
                label="Limit"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            {notificationType && (
              <Button
                variant="outlined"
                onClick={() => setNotificationType('')}
                size="small"
              >
                Clear Filter
              </Button>
            )}
          </Box>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Notifications List */}
        {!loading && data && data.data.length > 0 ? (
          <>
            <Stack spacing={1}>
              {data.data.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleNotificationRead}
                />
              ))}
            </Stack>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        ) : !loading ? (
          <Alert severity="info">No notifications found</Alert>
        ) : null}
      </Container>
    </>
  );
}
