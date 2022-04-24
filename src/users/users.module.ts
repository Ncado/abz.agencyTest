import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Positions } from 'src/positions/positions.model';
import { UserPositions } from 'src/positions/user-positions.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Positions, UserPositions]),
    JwtModule.register({secret:process.env.PRIVATE_KEY||"NOT_SECRET",
    signOptions:{
      expiresIn: "40m"
    }}),
    FilesModule,
  ]
})
export class UsersModule {}
