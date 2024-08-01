import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

//Декоратор контроллера
@Controller(/*Префикс для запроса*/'api')
//Создание контроллера для работы с запросами
export class AppController {
    //Внедрение сервиса в конструктор
    constructor(private appService:AppService) {
    }
    @Get()
    getUsers() {
        return this.appService.getUsers()
    }
}