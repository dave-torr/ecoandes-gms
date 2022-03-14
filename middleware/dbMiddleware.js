import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env

export async function connectToDatabase(){
	const client = await MongoClient.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return client;
}