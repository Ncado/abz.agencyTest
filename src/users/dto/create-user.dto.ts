import { IsEmail, IsString, Length,IsNumber } from "class-validator";
import { IsPhone } from "src/exceptions/phone.validate.decorator";
export class CreateUserDto {
   // @IsString({message: 'shoud be string'})
    //@Length(2,60,{message: 'shoud be string'})
     name:string;


  //  @IsEmail({},{message: 'uncorrect Email'})
    email:string;

  //  @IsPhone({message: 'incorrect phone'})
    phone:string;


  //  @IsNumber({},{message: 'shoud be number'})
    position_id:number;

    photo:string;

   // @IsString({message: 'shoud be string'})
    token:string;
}