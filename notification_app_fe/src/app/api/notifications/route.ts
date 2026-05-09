import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://4.224.186.213/evaluation-service/notifications';

// Mock data for demonstration purposes
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Placement Offer - TCS',
    message: 'Congratulations! You have received an offer from Tata Consultancy Services for the Software Engineer position.',
    type: 'Placement',
    priority: 9,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Interview Scheduled - Google',
    message: 'Your interview with Google has been scheduled for next week on Wednesday at 10:00 AM IST.',
    type: 'Event',
    priority: 8,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Exam Result Published',
    message: 'Your final semester exam results have been published. Visit the portal to view your scores.',
    type: 'Result',
    priority: 7,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Placement Drive - Microsoft',
    message: 'Microsoft is conducting a placement drive next month. Register now to participate.',
    type: 'Event',
    priority: 6,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Project Submission Deadline',
    message: 'Your final project submission deadline is extended to next Friday.',
    type: 'Event',
    priority: 5,
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    title: 'Internship Completed',
    message: 'Your internship with Amazon has been successfully completed. Certificate will be mailed soon.',
    type: 'Result',
    priority: 8,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    title: 'Scholarship Application Status',
    message: 'Your scholarship application has been approved. Check your email for more details.',
    type: 'Result',
    priority: 7,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '8',
    title: 'Campus Coding Competition',
    message: 'Join us for the annual campus coding competition. Winners get prizes worth 50k.',
    type: 'Event',
    priority: 4,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '9',
    title: 'Placement Offer - Infosys',
    message: 'You have been selected and received an offer from Infosys for Systems Engineer position.',
    type: 'Placement',
    priority: 9,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '10',
    title: 'Capstone Project Feedback',
    message: 'Feedback for your capstone project has been uploaded. Please review and make necessary revisions.',
    type: 'Result',
    priority: 6,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '11',
    title: 'Placement Interview - Wipro',
    message: 'Your Wipro interview is scheduled for tomorrow at 2:00 PM IST. Be prepared!',
    type: 'Event',
    priority: 9,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '12',
    title: 'Certificate Course Completion',
    message: 'You have completed the AWS Certified Associate course. Your certificate is ready for download.',
    type: 'Result',
    priority: 5,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const notificationType = searchParams.get('notification_type');

    let filteredNotifications = MOCK_NOTIFICATIONS;

    // Filter by type if provided
    if (notificationType) {
      filteredNotifications = filteredNotifications.filter(
        (n) => n.type === notificationType
      );
    }

    // Calculate pagination
    const total = filteredNotifications.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredNotifications.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}
