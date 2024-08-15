import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { FileService, FileType } from "src/file/file.service";
import { Album, AlbumDocument } from "src/track/schemas/album.schema";
import { CreateAlbumDto } from "src/track/dto/create-album.dto";
import { Track, TrackDocument } from "src/track/schemas/track.schema";

@Injectable()
export class AlbumService {
    constructor(
        //Подключение бд
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        //Подключение сервиса для загрузки файлов
        private fileService: FileService
    ) { }
    //Создание альбома
    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.ALBUM_IMAGE, picture)
        const album = await this.albumModel.create({ ...dto, picture: picturePath })
        return album
    }
    //Получение всех альбомов
    async getAll(count = 100, offset = 0): Promise<Album[]> {
        const albums = await this.albumModel.find().skip(offset).limit(count)
        return albums
    }
    //Получение альбома по Id
    async getOne(id: ObjectId): Promise<Album> {
        const album = (await this.albumModel.findById(id))
        return album
    }
    //Удаление альбома
    async delete(id: ObjectId) {
        const album = await this.albumModel.deleteOne({ _id: id })
        return id
    }
    async addTrack(trackId: ObjectId, albumId: ObjectId): Promise<ObjectId> {
        const album = await this.albumModel.findById(albumId)
        // @ts-ignore
        album.tracks.push(trackId)
        await album.save()
        return trackId
    }
    async deleteTracks(albumId: ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(albumId)
        // @ts-ignore
        album.tracks = []
        await album.save()
        return album
    }
    async getTracks(albumId: ObjectId) {
        const album = await this.albumModel.findById(albumId)
        const tracks = await this.trackModel.find({ _id: { $in: album.tracks } })
        return tracks
    }
}