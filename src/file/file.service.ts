import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image',
    ALBUM_IMAGE = 'album-image'
}

@Injectable()
export class FileService {
    createFile(type, file): string {
        try {
            //Расширение файла
            const fileExtension = file.originalname.split('.').pop()
            //Генерация имени файла
            const fileName = uuid.v4() + '.' + fileExtension
            //Путь для сохранения файла
            const filePath = path.resolve(__dirname, '..', 'static', type)
            //Проверка наличия директории, если отсутствует - создается
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            //Запись файла
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return type + '/' + fileName
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    removeFile(fileName: string) {

    }
}