import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Comment } from "./comment.schema";
import { ObjectId } from "mongodb";

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    //Поля таблицы
    @Prop()
    name: string
    @Prop()
    artist: string
    @Prop()
    text: string
    @Prop()
    listens: number
    @Prop()
    picture: string
    @Prop()
    audio: string
    //Поле со ссылкой на комментарий
    @Prop({ type: [{ type: ObjectId, ref: 'Comment' }] })
    comments: Comment[]
}
export const TrackSchema = SchemaFactory.createForClass(Track)