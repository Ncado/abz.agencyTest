import { Body,Headers, Controller, Get, Param, Post,HttpException ,HttpStatus, UsePipes, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @UseInterceptors(FileInterceptor('photo'))
    @UsePipes(ValidationPipe)
    @Post()
    create(@Headers() token,@Body() userDto: CreateUserDto, @UploadedFile() photo){
        userDto.photo = photo;
        userDto.token = token.authorization.split(' ')[1];
        return this.userService.createUser(userDto,token);
    }



    @Get("/list/:page/:limit")
    getAll(@Param('page') page: number,@Param('limit') limit: number){
        
       try{
        return this.userService.getUsers(page,limit);
       }catch(e){
        throw new HttpException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: {
                "success": false,
                "message": "Validation failed",
                "fails": {
                    "count": [
                        "The count must be an integer."
                    ],
                    "page": [
                        "The page must be at least 1."
                    ]
                }
            },
        }, HttpStatus.UNPROCESSABLE_ENTITY);
       }
       
    }


    @Get('/token')
    getToken(){
        
       
        return this.userService.generateToken();
    }

        @Get("/one/:id")
        getOne(@Param('id') id: number){
           
            
            try{
                return this.userService.getUserById(id);
    
               }catch(e){
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: {
                        "success": false,
                        "message": "Validation failed",
                        "fails": {
                              "user_id": [
                                  "The user_id must be an integer."
                              ]
                          }
                      },
                }, HttpStatus.BAD_REQUEST);
               }
           
        
    }
   
    @Get('/test')
    test(){
        
       
        return this.userService.seeder(5);
    }
}
