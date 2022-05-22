import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { createValidator } from 'express-joi-validation'
import { albumSchema } from "../schemas-joi/album-schema";
import { decodeToken } from '../firebase/token'
 
export const albumsRouter = express.Router();
albumsRouter.use(express.json());

const validator = createValidator()



albumsRouter.get("/", decodeToken, async (_req: Request, res: Response) => {
    try {
        const usuarios = await collections.usuarios.find({}).toArray();

        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


albumsRouter.get("/:id", decodeToken, async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const game = await collections.usuarios.findOne(query);

        if (game) {
            res.status(200).send(game);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});



albumsRouter.post("/", decodeToken, validator.body(albumSchema), async (req: Request, res: Response) => {
    try {
        const newAlbums = req.body;
        const result = await collections.usuarios.insertOne(newAlbums);

        result
            ? res.status(201).send(`Successfully created a new album with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new album.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

albumsRouter.put("/:id", decodeToken, validator.body(albumSchema), async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedAlbum = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections.usuarios.updateOne(query, { $set: updatedAlbum });

        result
            ? res.status(200).send(`Successfully updated album with id ${id}`)
            : res.status(304).send(`Album with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

albumsRouter.delete("/:id", decodeToken, async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.usuarios.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed album with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove album with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Album with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

