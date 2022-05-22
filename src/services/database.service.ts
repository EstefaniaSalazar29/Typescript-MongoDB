import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Usuarios from "../models/albums";


export const collections: { usuarios?: mongoDB.Collection<Usuarios> } = {};

export async function connectToDatabase() {
    // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
    dotenv.config();

    // Create a new MongoDB client with the connection string from .env
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    // Connect to the cluster
    await client.connect();

    // Connect to the database with the name specified in .env
    const db = client.db(process.env.DB_NAME);
    
    // Apply schema validation to the collection
    // await applySchemaValidation(db);

    // Connect to the collection with the specific name from .env, found in the database previously specified
    const usuariosCollection = db.collection<Usuarios>(process.env.ALBUMS_COLLECTION_NAME);

    // Persist the connection to the Games collection
    collections.usuarios = usuariosCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${usuariosCollection.collectionName}`,
    );
}


// async function applySchemaValidation(db: mongoDB.Db) {
//     const jsonSchema = {
//         $jsonSchema: {
//             bsonType: "object",
//             required: ["name", "price", "category"],
//             additionalProperties: false,
//             properties: {
//                 _id: {},
//                 name: {
//                     bsonType: "string",
//                     description: "'name' is required and is a string",
//                 },
//                 gender: {
//                     bsonType: "string",
//                     description: "'price' is required and is a string",
//                 },
//                 listeners: {
//                     bsonType: "number",
//                     description: "'category' is required and is a number",
//                 },
//             },
//         },
//     };

//     // Try applying the modification to the collection, if the collection doesn't exist, create it 
//    await db.command({
//         collMod: process.env.ALBUMS_COLLECTION_NAME,
//         validator: jsonSchema
//     }).catch(async (error: mongoDB.MongoServerError) => {
//         if (error.codeName === 'NamespaceNotFound') {
//             await db.createCollection(process.env.ALBUMS_COLLECTION_NAME, {validator: jsonSchema});
//         }
//     });
// }