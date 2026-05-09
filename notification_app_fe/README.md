# Affordmed Notifications Frontend

A responsive React/Next.js application for displaying notifications with priority filtering and read/unread status tracking.

## Features

- **All Notifications Page**: Display all notifications with pagination, filtering by type
- **Priority Notifications Page**: Display top priority notifications with statistics
- **Notification Type Filtering**: Filter by Event, Result, or Placement
- **Read/Unread Tracking**: Mark notifications as read/unread (stored in localStorage)
- **Responsive Design**: Fully responsive for desktop and mobile views
- **Material UI Styling**: Professional UI using Material UI components
- **Error Handling**: Robust error handling for API failures
- **Loading States**: Smooth loading indicators and transitions

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Material UI (MUI)
- **HTTP Client**: Axios
- **Language**: TypeScript
- **State Management**: React Hooks + localStorage

## Installation

```bash
# Install dependencies
npm install

# or with yarn
yarn install
```

## Running the Application

```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## API Integration

The application connects to the Notifications API at:
```
http://4.224.186.213/evaluation-service/notifications
```

### Query Parameters
- `limit`: Number of notifications to fetch (default: 10)
- `page`: Page number for pagination (default: 1)
- `notification_type`: Filter by type (Event, Result, Placement)

## Project Structure

```
notification_app_fe/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with MUI provider
│   │   ├── page.tsx            # All notifications page
│   │   ├── globals.css         # Global styles
│   │   └── priority-notifications/
│   │       └── page.tsx        # Priority notifications page
│   ├── components/
│   │   ├── Navigation.tsx      # App navigation header
│   │   └── NotificationCard.tsx # Notification display component
│   ├── hooks/
│   │   └── useNotifications.ts # Custom hook for fetching data
│   └── lib/
│       ├── api.ts             # API utility functions
│       └── notificationStore.ts # Read state management
├── package.json
├── tsconfig.json
└── next.config.js
```

## Features Breakdown

### 1. All Notifications Page (`/`)
- Displays all notifications with pagination
- Filter by notification type
- Configurable display limit (5, 10, 20, 50)
- Shows unread count
- Mark individual notifications as read/unread

### 2. Priority Notifications Page (`/priority-notifications`)
- Displays top-priority notifications
- Shows statistics dashboard with:
  - Total count
  - High priority count
  - Medium priority count
  - Low priority count
- Display limit options (Top 3, 5, 10, 20)
- Ranked display with priority indicators

### 3. Notification Features
- **Visual Distinction**: Read notifications have reduced opacity
- **New Badge**: Unread notifications show a "New" badge
- **Type Indicators**: Color-coded chips for notification type
- **Priority Display**: Shows priority level
- **Timestamps**: Creation and update times
- **Icons**: Visual indicators for read/unread status

## Responsive Design

The application is fully responsive:
- **Desktop (> 900px)**: Multi-column layouts with full sidebar
- **Tablet (600-900px)**: Adjusted grid layouts
- **Mobile (< 600px)**: Single column layout with optimized touch targets

## Data Persistence

- Read/unread status is stored in localStorage
- User preferences (limit, current page) are maintained during session
- Data syncs across browser tabs

## Error Handling

- Network errors display user-friendly messages
- Loading states prevent UI flashing
- Graceful fallbacks for missing data
- Console logging for debugging

## Material UI Customization

The application uses a custom Material UI theme with:
- Primary color: #1976d2 (Blue)
- Secondary color: #dc004e (Pink)
- Success color: #4caf50 (Green)
- Warning color: #ff9800 (Orange)
- Error color: #f44336 (Red)

Card hover effects and smooth transitions enhance UX.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Next.js automatic code splitting
- Client-side rendering for better interactivity
- Efficient re-renders with React hooks
- Optimized images and assets

## Development

### Adding a New Page

1. Create a new folder in `src/app/`
2. Add `page.tsx` file
3. Use existing components (NotificationCard, Navigation)
4. Import useNotifications hook for data fetching

### Adding a New Component

1. Create file in `src/components/`
2. Use Material UI components
3. Export as default
4. Import in required pages

## Future Enhancements

- Real-time notifications using WebSockets
- Notification search functionality
- Advanced filtering (date range, priority range)
- Notification deletion
- Archive functionality
- Dark mode support
- Push notifications
- Email digest

## License

Proprietary - Affordmed Technologies
