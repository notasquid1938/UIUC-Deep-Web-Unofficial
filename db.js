import { MongoClient } from 'mongodb';

const mongoURL = 'mongodb://127.0.0.1:27017/UIUC-Tor';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db();
  cachedDb = db;

  return db;
}

export default connectToDatabase;