import { BelongsToMany, Column, DataType, ForeignKey, Model,Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Positions } from "./positions.model";



@Table({tableName:'user-positions', createdAt:false, updatedAt:false})
export class UserPositions extends Model<UserPositions>{

    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    
    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId:number;

    @ForeignKey(()=>Positions)
    @Column({type:DataType.INTEGER})
    positionsId:number;
}