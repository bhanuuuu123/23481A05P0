# Affordmed Notifications Frontend

Frontend application developed for the Affordmed Campus Hiring Evaluation.

## Features

- All Notifications Page
- Priority Notifications Page
- Filter Notifications by Type
- Pagination Support
- Viewed / Unviewed Notification State
- Responsive UI
- Material UI Integration
- Logging Middleware Integration

## Tech Stack

- React / Next.js
- TypeScript
- Material UI
- Fetch API

## Project Structure

notification_app_fe/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── priority-notifications/page.tsx
│   │   └── api/notifications/route.ts
│   ├── components/
│   │   ├── Navigation.tsx
│   │   └── NotificationCard.tsx
│   ├── hooks/
│   │   └── useNotifications.ts
│   └── lib/
│       ├── api.ts
│       └── notificationStore.ts

## Run Project

Install dependencies:

npm install

Run development server:

npm run dev

Application runs on:

http://localhost:3000

