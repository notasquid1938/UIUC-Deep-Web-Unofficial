let onlineUsers = new Map(); // Use a Map to store usernames and their last active timestamps

export default async function handler(req, res) {
  // Check for usernames that have not sent a "STILL ONLINE" message in the last 10 seconds
  const currentTime = Date.now();
  onlineUsers.forEach((lastActiveTime, username) => {
    if (currentTime - lastActiveTime > 10000) {
      onlineUsers.delete(username); // Remove the username from the set
      console.log(`${username} has been removed from the online users.`);
    }
  });

  if (req.method === 'POST') {
    const { message, username } = req.body;

    if (message === 'NEW USER') {
      if (!onlineUsers.has(username)) {
        onlineUsers.set(username, Date.now()); // Store the username with its timestamp
        console.log(`${username} is now online. Online users: ${onlineUsers.size}`);
        console.log(Array.from(onlineUsers.keys())); // Convert Map keys to an array for logging
        // Send a JSON response to the client
        res.status(200).json({ message: 'User added successfully' });
      } else {
        // User already exists in the set
        res.status(409).json({ message: 'User already exists' });
      }
      return; // Ensure the function exits here
    } else if (message === 'STILL ONLINE') {
      // Handle the "STILL ONLINE" message
      if (onlineUsers.has(username)) {
        onlineUsers.set(username, Date.now()); // Update the last active timestamp
        console.log(`${username} is still online.`);
        // You can perform additional actions here if needed.
        res.status(200).json({ message: 'User is still online' });
      } else {
        // User is not in the onlineUsers set, handle this case if necessary.
        res.status(404).json({ message: 'User not found' });
      }
      return;
    }

    // If the message is not 'NEW USER' or 'STILL ONLINE', return a 400 Bad Request
    res.status(400).json({ message: 'Bad Request' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
