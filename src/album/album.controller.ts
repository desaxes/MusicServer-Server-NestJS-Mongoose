import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "src/track/dto/create-album.dto";

@Controller('/album')
export class AlbumController {
    constructor(private albumService: AlbumService) { }
    @Post()
    //Загрузка файлов
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const { picture } = files
        return this.albumService.create(dto, picture[0])
    }
    //Все треки
    @Get()
    getAll(
        //Пагинация
        @Query('count') count: number,
        @Query('offset') offset: number
    ) {
        return this.albumService.getAll(count, offset)
    }
    //Трек по Id
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }
    //Удаление
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id)
    }
    @Post('/track/:id')
    addTrack(@Param('id') id: ObjectId, @Body() { trackId }) {
        return this.albumService.addTrack(trackId, id)
    }
    @Delete('/track/:id')
    deleteTracks(@Param('id') id: ObjectId) {
        return this.albumService.deleteTracks(id)
    }
    @Get('/track/:id')
    getTracks(@Param('id') id: ObjectId) {
        return this.albumService.getTracks(id)
    }
}