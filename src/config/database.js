import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('hub_rpg');

        console.log('Conectado ao bando de dados com sucesso');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
};

const getDB = () => db;

export { connectDB, getDB };