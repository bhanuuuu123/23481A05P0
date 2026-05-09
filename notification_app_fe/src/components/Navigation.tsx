'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarIcon from '@mui/icons-material/Star';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" sx={{ mb: 3 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <NotificationsIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
            }}
          >
            Affordmed Notifications
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: pathname === '/' ? 'bold' : 'normal',
                  borderBottom: pathname === '/' ? '2px solid white' : 'none',
                }}
              >
                All Notifications
              </Button>
            </Link>
            <Link href="/priority-notifications" style={{ textDecoration: 'none' }}>
              <Button
                color="inherit"
                startIcon={<StarIcon />}
                sx={{
                  fontWeight: pathname === '/priority-notifications' ? 'bold' : 'normal',
                  borderBottom: pathname === '/priority-notifications' ? '2px solid white' : 'none',
                }}
              >
                Priority
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
