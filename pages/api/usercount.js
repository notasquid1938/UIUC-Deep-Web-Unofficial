let onlineUsers = new Map();

function markUserAsOffline(username) {
  onlineUsers.delete(username);
  console.log(`${username} has been marked as offline. Online users: ${onlineUsers.size}`);
}

// Function to periodically check and mark users as offline
function checkAndMarkUsersOffline() {
  const currentTime = Date.now();
  onlineUsers.forEach((lastActiveTime, username) => {
    if (currentTime - lastActiveTime > 8000) {
      markUserAsOffline(username);
    }
  });
}

// Set up a timer to run the checkAndMarkUsersOffline function every 8 seconds
setInterval(checkAndMarkUsersOffline, 8000);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, username } = req.body;

    if (message === 'NEW USER') {
      if (!onlineUsers.has(username)) {
        onlineUsers.set(username, Date.now());
        console.log(`${username} is now online. Online users: ${onlineUsers.size}`);
        console.log(Array.from(onlineUsers.keys()));
        res.status(200).json({ message: 'User added successfully' });
      } else {
        res.status(409).json({ message: 'User already exists' });
      }
      return;
    } else if (message === 'STILL ONLINE') {
      if (onlineUsers.has(username)) {
        onlineUsers.set(username, Date.now());
        console.log(`${username} is still online.`);
        res.status(200).json({ message: 'User is still online' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
      return;
    }

    res.status(400).json({ message: 'Bad Request' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
