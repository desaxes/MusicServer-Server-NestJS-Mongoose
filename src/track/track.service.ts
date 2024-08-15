import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Model, ObjectId } from "mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto copy";
import { FileService, FileType } from "src/file/file.service";

@Injectable()
export class TrackService {
    constructor(
        //Подключение бд
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        //Подключение сервиса для загрузки файлов
        private fileService: FileService
    ) { }
    //Создание трека
    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const track = await this.trackModel.create({ ...dto, listens: 0, picture: picturePath, audio: audioPath })
        return track
    }
    //Получение всех треков
    async getAll(count = 100, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(offset).limit(count)
        return tracks
    }
    //Получение трека по Id
    async getOne(id: ObjectId): Promise<Track> {
        const track = (await this.trackModel.findById(id))
        return track
    }
    //Удаление трека
    async delete(id: ObjectId) {
        const track = await this.trackModel.deleteOne({ _id: id })
        return id
    }
    //Добавление комментария
    async addComment(dto: CreateCommentDto): Promise<Comment> {
        // const track = await this.trackModel.findById(dto.trackId)

        const comment = await this.commentModel.create({ ...dto })
        // @ts-ignore
        //Сохранение id комментария в треке
        // track.comments.push(comment._id)
        // await track.save()
        return comment
    }
    //Получение комментариев к конкретному треку
    async getCommentsById(id: ObjectId): Promise<Comment[]> {
        const comments = await this.commentModel.find({ trackId: id })
        return comments
    }
    //Увеличение кол-ва прослушиваний
    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id)
        track.listens += 1
        track.save()
    }
    //Поиск по названию
    async search(query: string): Promise<Track[]> {
        //Без учета регистра
        const tracks = await this.trackModel.find({ name: { $regex: new RegExp(query, 'i') } })
        return tracks
    }
}