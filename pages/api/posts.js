import connectToDatabase from '../../db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('Posts');

    if (req.method === 'POST') {
      const { title, content, username } = req.body;
      const result = await collection.insertOne({
        username,
        title,
        content,
        upvotes: 0,
        downvotes: 0,
      });
      res.status(201).json(result.ops[0]);
    } else if (req.method === 'GET') {
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } else if (req.method === 'PUT') {
      const postId = req.body.postId;
      const action = req.body.action;
      const update = {};

      if (action === 'upvote') {
        update.$inc = { upvotes: 1 };
      } else if (action === 'downvote') {
        update.$inc = { downvotes: 1 };
      }
      const updatedPost = await collection.findOneAndUpdate(
        { _id: new ObjectId(postId) },
        update,
        { returnOriginal: false }
      );
      res.status(200).json(updatedPost.value);
    } else if (req.method === 'OPTIONS') {
        const { type, username, postId, text } = req.body;
        const result = await collection.insertOne({
          type,
          username,
          postId,
          text,
        });
        res.status(201).json(result.ops[0]);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
