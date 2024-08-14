import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto copy";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) { }
    @Post()
    //Загрузка файлов
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const { picture, audio } = files
        return this.trackService.create(dto, picture[0], audio[0])
    }
    //Все треки
    @Get()
    getAll(
        //Пагинация
        @Query('count') count: number,
        @Query('offset') offset: number
    ) {
        return this.trackService.getAll(count, offset)
    }
    //Поиск
    @Get('/search')
    search(
        @Query('query') query: string
    ) {
        return this.trackService.search(query)
    }
    //Трек по Id
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id)
    }
    //Удаление
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id)
    }
    //Комментарий
    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        console.log(dto)
        return this.trackService.addComment(dto)
    }
    //Комменты для трека
    @Get('/comment/:id')
    getComments(@Param('id') id: ObjectId) {
        return this.trackService.getCommentsById(id)
    }
    //Прослушивания
    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id)
    }
}