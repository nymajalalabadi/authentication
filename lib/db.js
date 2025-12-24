import { MongoClient } from 'mongodb';

export async function connectToDatabase() {

    const client = await MongoClient.connect('mongodb+srv://nima:test123@cluster0.q2qrhzb.mongodb.net/authentication?appName=Cluster0'); 
    return client;
}

