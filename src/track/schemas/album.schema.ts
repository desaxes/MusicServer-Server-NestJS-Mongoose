import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    name: string
    @Prop()
    desc: string
    @Prop()
    picture: string
    @Prop()
    tracks: ObjectId[]
}
export const AlbumSchema = SchemaFactory.createForClass(Album)