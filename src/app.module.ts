import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";

// Модуль для настройки сервера
@Module({
    //Импорт других модулей
    imports: [
        TrackModule,
        //Подключение монго
        MongooseModule.forRoot('mongodb+srv://desaxes24:admin@cluster0.fd7ke6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    ],
    //Объявление контроллеров приложения
    controllers: [AppController],
    //Объявление провайдеров приложения
    providers: [AppService]
})
export class AppModule { }