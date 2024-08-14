import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import { Track } from "./track.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    username: string
    @Prop()
    text: string
    @Prop()
    trackId: ObjectId
}
export const CommentSchema = SchemaFactory.createForClass(Comment)