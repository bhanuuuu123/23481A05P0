const axios = require("axios");
const Log = require("./logger");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YWxsYWJoYW5lbmliaGFudXNyaUBnbWFpbC5jb20iLCJleHAiOjE3NzgzMTA3NTgsImlhdCI6MTc3ODMwOTg1OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjY0YjU2MTA0LTBjYzMtNDc0ZS1iM2NmLTMzNDg1Mjk1YmMyYyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhbGxhYmhhbmVuaSBiaGFudSBzcmkiLCJzdWIiOiJkODg1NDRkYi04MDI2LTRkOTMtYjVmYy1lMTJiMDZmOTlhOWEifSwiZW1haWwiOiJ2YWxsYWJoYW5lbmliaGFudXNyaUBnbWFpbC5jb20iLCJuYW1lIjoidmFsbGFiaGFuZW5pIGJoYW51IHNyaSIsInJvbGxObyI6IjIzNDgxYTA1cDAiLCJhY2Nlc3NDb2RlIjoiZUpkQ3VDIiwiY2xpZW50SUQiOiJkODg1NDRkYi04MDI2LTRkOTMtYjVmYy1lMTJiMDZmOTlhOWEiLCJjbGllbnRTZWNyZXQiOiJxR2ZoeGVua0VIWndabmpEIn0.KT7nsjrrKSzk7Dmy1f1YHOIecqfjDxusbYbvDcYWP00";

const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function fetchNotifications() {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications from API"
    );

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const notifications = response.data.notifications;

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    // Sort by priority and timestamp
    notifications.sort((a, b) => {

      // priority comparison
      const priorityDiff =
        PRIORITY[b.Type] - PRIORITY[a.Type];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      // recent notifications first
      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

    const top10 = notifications.slice(0, 10);

    await Log(
      "frontend",
      "info",
      "component",
      "Top 10 notifications calculated"
    );

    console.log("\nTOP 10 NOTIFICATIONS\n");

    top10.forEach((item, index) => {
      console.log(
        `${index + 1}. [${item.Type}] ${item.Message}`
      );
    });

  } catch (error) {

    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    console.error(error.response?.data || error.message);
  }
}

fetchNotifications();