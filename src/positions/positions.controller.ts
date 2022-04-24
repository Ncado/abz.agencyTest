import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePositionsDto } from './dto/create-positions.dto';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {

    constructor(private positionsService: PositionsService){}

    @Post()
    create(@Body() dto: CreatePositionsDto){
        return this.positionsService.createPosition(dto);
    }

    @Get()
    getAll(){
        return this.positionsService.getPosition();
    }
}
