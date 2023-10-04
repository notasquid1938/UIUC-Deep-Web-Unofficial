let onlineUsers = new Set();
let userActivity = {}; // Store last activity timestamp for each user

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, username } = req.body;

    if (message === 'NEW USER') {
      onlineUsers.add(username);
      userActivity[username] = Date.now(); // Record the user's last activity time
      console.log(`${username} is now online. Online users: ${onlineUsers.size}`);
    } else if (message === 'STILL ONLINE') {
      // If the user is already online, update their activity
      if (onlineUsers.has(username)) {
        userActivity[username] = Date.now(); // Update the user's last activity time
        console.log(`${username} is still online.`);
      } else {
        console.log(`${username} is not online.`);
      }
    } else {
      res.status(400).json({ error: 'Invalid message' });
      return;
    }

    res.status(200).json({ count: onlineUsers.size });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
