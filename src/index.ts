import express from "express";
import { connectToDatabase } from "./services/database.service";
import { albumsRouter } from "./routes/albums.routes";
import { decodeToken } from './firebase/adminTokens';

const app = express();
const port = 8080; // default port to listen


app.use(decodeToken)

connectToDatabase()
    .then(() => {
        // send all calls to /games to our gamesRouter
        app.use("/usuarios", albumsRouter);

        // start the Express server
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });