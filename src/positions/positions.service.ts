import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePositionsDto } from './dto/create-positions.dto';
import { Positions } from './positions.model';

@Injectable()
export class PositionsService {

    constructor(@InjectModel(Positions) private positionsRepository: typeof Positions){}


    async createPosition(dto: CreatePositionsDto){
        const position = await this.positionsRepository.create(dto);
        return position;
    }

    async getPosition(){
        const Positions = await this.positionsRepository.findAll();
        const status = {
            succes:true
        };
        const styleP = {
            positions: Positions
        }
        const fin = Object.assign(status, styleP)

        return fin;
    }
}
