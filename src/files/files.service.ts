import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import sharp from 'sharp';
//import tinify from 'tinify'
var tinify = require("tinify");

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        // try{
        tinify.key = "TpdcM9QwQDjJXY1Jd0Q7CRf0rQRTYNYp";
        const fileName1 = uuid.v4() + '.jpg';
        const filePath = path.resolve(__dirname, '..', 'static')
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true })
        }
        await fs.writeFileSync(path.join(filePath, fileName1), file.buffer)
        const fileName2 = uuid.v4() + '.jpg';


        const source = tinify.fromFile(path.join(filePath, fileName1));
        const resized = source.resize({
            method: "cover",
            width: 70,
            height: 70
        });
        resized.toFile(path.join(filePath, fileName2));

        // await sharp(path.join(filePath, fileName1)).resize(70, 70).jpeg().toFile(path.join(filePath, fileName2));

        await fs.unlink(path.join(filePath, fileName1), (err => {
            if (err) console.log(err);
        }));

       // tinify.fromFile(path.join(filePath, fileName2)).toFile(path.join(filePath, fileName1));
        return fileName2;
        // }catch(e){
        //     throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
        // }

    }
}
