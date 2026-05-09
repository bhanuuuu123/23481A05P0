'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Stack,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
} from '@mui/material';
import Navigation from '@/components/Navigation';
import NotificationCard from '@/components/NotificationCard';
import { useNotifications } from '@/hooks/useNotifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function PriorityNotifications() {
  const [limit, setLimit] = useState(5);
  const [notificationType, setNotificationType] = useState<string>('');

  const { data, loading, error } = useNotifications({
    limit: 100, // Fetch more to sort by priority
    page: 1,
    priority: true,
  });

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handleTypeChange = (event: any) => {
    setNotificationType(event.target.value);
  };

  // Filter and slice data
  let filteredData = data?.data || [];
  if (notificationType) {
    filteredData = filteredData.filter(n => n.type === notificationType);
  }
  const displayedNotifications = filteredData.slice(0, limit);

  const stats = {
    totalPriority: filteredData.length,
    highPriority: filteredData.filter(n => n.priority >= 8).length,
    mediumPriority: filteredData.filter(n => n.priority >= 5 && n.priority < 8).length,
    lowPriority: filteredData.filter(n => n.priority < 5).length,
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUpIcon color="warning" />
            Priority Notifications
          </Typography>

          {/* Stats Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Total
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {stats.totalPriority}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#ffebee' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="error" gutterBottom>
                    High Priority
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                    {stats.highPriority}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#fff3e0' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="warning" gutterBottom>
                    Medium Priority
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                    {stats.mediumPriority}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#e8f5e9' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="success" gutterBottom>
                    Low Priority
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                    {stats.lowPriority}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
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
              <InputLabel>Display Limit</InputLabel>
              <Select
                value={limit}
                onChange={handleLimitChange}
                label="Display Limit"
              >
                <MenuItem value={3}>Top 3</MenuItem>
                <MenuItem value={5}>Top 5</MenuItem>
                <MenuItem value={10}>Top 10</MenuItem>
                <MenuItem value={20}>Top 20</MenuItem>
              </Select>
            </FormControl>
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

        {/* Priority Notifications List */}
        {!loading && displayedNotifications.length > 0 ? (
          <Stack spacing={1}>
            {displayedNotifications.map((notification, index) => (
              <Box key={notification.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip
                    label={`#${index + 1} - Priority: ${notification.priority}`}
                    color={notification.priority >= 8 ? 'error' : notification.priority >= 5 ? 'warning' : 'default'}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <NotificationCard notification={notification} />
              </Box>
            ))}
          </Stack>
        ) : !loading ? (
          <Alert severity="info">No priority notifications found</Alert>
        ) : null}
      </Container>
    </>
  );
}
