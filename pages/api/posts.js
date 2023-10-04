import connectToDatabase from '../../db';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('Posts');

    if (req.method === 'POST') {
      const { title, content } = req.body;
      const result = await collection.insertOne({ title, content });
      res.status(201).json(result.ops[0]);
    } else if (req.method === 'GET') {
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
