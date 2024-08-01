import { Injectable } from "@nestjs/common";

//Внедряемый в конструктор класс для выполнения логики
@Injectable()
export class AppService {
    getUsers(): string {
        return 'Users'
    }
}