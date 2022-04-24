import { BelongsToMany, Column, DataType, Model,Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserPositions } from "./user-positions.model";

interface PositionsCreationAttrs{
    name:string;

}


@Table({tableName:'positions'})
export class Positions extends Model<Positions>{

    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    
    @Column({type:DataType.STRING,allowNull:false})
    name:string;

    @BelongsToMany(()=> User, ()=>UserPositions)
    users: User[];

}