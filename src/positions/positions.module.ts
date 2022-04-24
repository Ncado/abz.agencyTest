import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Positions } from './positions.model';
import { User } from 'src/users/users.model';
import { UserPositions } from './user-positions.model';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [
    SequelizeModule.forFeature([Positions, User, UserPositions])
  ]
})
export class PositionsModule {}
