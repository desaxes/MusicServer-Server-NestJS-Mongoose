import { ObjectId } from "mongoose";

export class CreateAlbumDto {
    readonly name: string;
    readonly desc: string;
    readonly tracks: string[]
}