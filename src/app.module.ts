import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { PositionsModule } from './positions/positions.module';
import { Positions } from './positions/positions.model';
import { UserPositions } from './positions/user-positions.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [ ConfigModule.forRoot({envFilePath:'.env'}) ,
   SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [User,Positions, UserPositions],
    autoLoadModels: true
  }), UsersModule, PositionsModule, FilesModule,
  ServeStaticModule.forRoot({
    rootPath: path.resolve( __dirname, 'static'),
  }),],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
