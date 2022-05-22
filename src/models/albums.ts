import { ObjectId } from "mongodb";

export default interface Usuarios {
    name: string;
    gender: string;
    listeners: number;
    id?: ObjectId;
}