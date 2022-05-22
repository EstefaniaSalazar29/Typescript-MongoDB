import { Request, Response, NextFunction } from "express";
import config from "./config";

export const decodeToken = async (_req: Request, res: Response, next: NextFunction) => {
    const token = _req.headers.authorization?.split(" ")[1];
    try {
        if (token === undefined) {
            return res.status(401).json({ message: "El token ha vencido, no estás autorizad@" });
        } else {
            const decodeValue = await config.admin.auth().verifyIdToken(token!);
            if (decodeValue != null || decodeValue != undefined) {
                return next();
            }
            return res.json({ message: "El token ha vencido, no estás autorizado" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Internal Server Error" }).status(500);
    }
}