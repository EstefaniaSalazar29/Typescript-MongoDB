import express from "express";
import { connectToDatabase } from "./services/database.service";
import { albumsRouter } from "./routes/albums.routes";
import { authRouter } from "./routes/auth.routes";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = 8080; // default port to listen

const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Reto',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8080/',
            }
        ]
    },
    apis: ['./dist/docs/*.js']
}


// app.use(decodeToken)

connectToDatabase()
    .then(() => {
        app.use("/usuarios", albumsRouter);
        app.use("/auth", authRouter);
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)))
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });