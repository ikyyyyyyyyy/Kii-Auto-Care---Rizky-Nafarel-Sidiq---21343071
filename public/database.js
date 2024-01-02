const { MongoClient } = require("mongodb");

const mongoURI = 'mongodb://localhost:27017'; // Ganti dengan URL MongoDB Anda
const dbName = 'autocare';
const collectionName = 'order';

async function connectToDatabase() {
  const client = new MongoClient(mongoURI);
  await client.connect();
  const db = client.db("autocare");
  const ordersCollection = db.collection("order");

  return { client, ordersCollection };
}

module.exports = { connectToDatabase };
