let onlineUsers = new Set();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, username } = req.body;

    if (message === 'NEW USER') {
      if (!onlineUsers.has(username)) {
        onlineUsers.add(username);
        console.log(`${username} is now online. Online users: ${onlineUsers.size}`);
        console.log(Array.from(onlineUsers)); // Convert Set to an array for logging
        // Send a JSON response to the client
        res.status(200).json({ message: 'User added successfully' });
      } else {
        // User already exists in the set
        res.status(409).json({ message: 'User already exists' });
      }
      return; // Ensure the function exits here
    }

    // If the message is not 'NEW USER', return a 400 Bad Request
    res.status(400).json({ message: 'Bad Request' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
