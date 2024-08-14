import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { AlbumModule } from "./album/album.module";

// Модуль для настройки сервера
@Module({
    //Импорт других модулей
    imports: [
        TrackModule,
        AlbumModule,
        //Подключение монго
        MongooseModule.forRoot('mongodb+srv://desaxes24:admin@cluster0.fd7ke6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
        //Раздача статики
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        })
    ],
    //Объявление контроллеров приложения
    controllers: [AppController],
    //Объявление провайдеров приложения
    providers: [AppService]
})
export class AppModule { }