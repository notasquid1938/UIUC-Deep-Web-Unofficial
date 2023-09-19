import connectToDatabase from '../../db';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('Messages');
    const data = await collection.find({}).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

