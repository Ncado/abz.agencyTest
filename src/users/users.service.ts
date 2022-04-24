import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { FilesService } from 'src/files/files.service';
import { faker } from '@faker-js/faker';


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private jwtService: JwtService,
        private fileService: FilesService
    ) { }


    async createUser(dto: CreateUserDto, token) {
        if (this.jwtService.verify(token.authorization.split(' ')[1]).veracity == "yes") {


            const fileName = await this.fileService.createFile(dto.photo);
            dto.photo = fileName;
            // return fileName;
            const user = await this.userRepository.create(dto);
            return user;
        }


    }


    async generateToken() {


        const payload = { veracity: "yes" }
        return {
            succes: true,
            token: await this.jwtService.sign(payload)
        }
    }


    async getUsers(Page: number, limit: number) {
        try {
            Page = Page || 1
            limit = limit || 4
            let Offset = Page * limit - limit

            if (Page < 1 || limit < 0) {
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

            const users = await this.userRepository.findAndCountAll({ offset: Offset, limit: limit });
            const TotalPagesCount = Math.ceil(users.count / limit);

            if (Page > TotalPagesCount) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: {
                        "success": false,
                        "message": "Page not found"
                    },
                }, HttpStatus.NOT_FOUND);
            }


            const status = {

                succes: true,
                page: Page,
                total_pages: TotalPagesCount,
                total_users: users.count,
                count: limit,
                links: {
                    next_url: Number(Page) + 1 > TotalPagesCount ? null : `http://localhost:5000/users/list/${Number(Page) + 1}/${limit}`,
                    prev_url: Number(Page) - 1 < 1 ? null : `http://localhost:5000/users/list/${Number(Page) - 1}/${limit}`,
                }
            };
            users.count = limit;
            const resArr = Object.assign(status, users)
            return resArr;
        } catch (e) {
            if (e.status == 404) {
                return e.response
            }
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

    async getUserById(value: number) {

        try {




            const User = await this.userRepository.findOne({ where: { id: value } })
            if (!User) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: {
                        "success": false,
                        "message": "The user with the requested identifier does not exist",
                        "fails": {
                            "user_id": [
                                "User not found"
                            ]
                        }
                    },
                }, HttpStatus.NOT_FOUND);
            }

            const status = {
                succes: true
            };
            const styleU = {
                user: User
            }

            const fin = Object.assign(status, styleU)

            return fin;
        }
        catch (e) {
            if (e.status == 404) {
                return e.response
            }

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
   
  
    getRandomPhone():string {
    let result=""
    for(let i=0;i<9;i++){
        result= result+ String(Math.floor(Math.random() * 10))
    }
    return result
    }
    
    async dataGenerator(){
        const userTemplate:CreateUserDto ={
            name: await faker.name.firstName()+" "+faker.name.lastName(),
            email:await faker.internet.email(),
            phone:await"+380"+this.getRandomPhone(),
            position_id: Math.floor(Math.random() * 10),
            photo:await faker.image.avatar() ,
            token: (await this.generateToken()).token
        }
        await this.userRepository.create(userTemplate)
        return userTemplate;
    }

    async seeder(count:number){
     
       // await this.dataGenerator();
        if(count!=0){
            await this.dataGenerator()
         //   return await this.seeder(count-1)
            return new Promise(resolve => {
                        setTimeout(() => resolve(this.seeder(count-1)), 900)
                    })
        }

        // if(count == 0) return await this.dataGenerator()
        // return new Promise(resolve => {
        //     setTimeout(() => resolve(this.seeder(count)), 1000)
        // })
       
        return "cool";
    }
    // async function awaitSubmissionFinish(submissionID, status) {
    //     const response = await submissionInfo(submissionID)
    //     if(status == 0) return response
    //     return new Promise(resolve => {
    //         setTimeout(() => resolve(awaitSubmissionFinish(submissionID, response.status)), 5000)
    //     })
    // }
}
