const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YWxsYWJoYW5lbmliaGFudXNyaUBnbWFpbC5jb20iLCJleHAiOjE3NzgzMTA3NTgsImlhdCI6MTc3ODMwOTg1OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjY0YjU2MTA0LTBjYzMtNDc0ZS1iM2NmLTMzNDg1Mjk1YmMyYyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhbGxhYmhhbmVuaSBiaGFudSBzcmkiLCJzdWIiOiJkODg1NDRkYi04MDI2LTRkOTMtYjVmYy1lMTJiMDZmOTlhOWEifSwiZW1haWwiOiJ2YWxsYWJoYW5lbmliaGFudXNyaUBnbWFpbC5jb20iLCJuYW1lIjoidmFsbGFiaGFuZW5pIGJoYW51IHNyaSIsInJvbGxObyI6IjIzNDgxYTA1cDAiLCJhY2Nlc3NDb2RlIjoiZUpkQ3VDIiwiY2xpZW50SUQiOiJkODg1NDRkYi04MDI2LTRkOTMtYjVmYy1lMTJiMDZmOTlhOWEiLCJjbGllbnRTZWNyZXQiOiJxR2ZoeGVua0VIWndabmpEIn0.KT7nsjrrKSzk7Dmy1f1YHOIecqfjDxusbYbvDcYWP00"

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

module.exports = Log;