import connectToDatabase from '../../db';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('Messages');

    if (req.method === 'GET') {
      // Handle GET request to fetch messages
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      // Handle POST request to add a new message
      const { text, username } = req.body; // Include the 'username' field from the request body

      if (!text || !username) {
        res.status(400).json({ error: 'Message text and username are required' });
        return;
      }

      const newMessage = { text, username, timestamp: new Date() }; // Include the 'username' in the new message
      const result = await collection.insertOne(newMessage);

      res.status(201).json(result.ops[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
