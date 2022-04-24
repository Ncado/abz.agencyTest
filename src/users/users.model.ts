import { BelongsToMany, Column, DataType, Model,Table } from "sequelize-typescript";
import { Positions } from "src/positions/positions.model";
import { UserPositions } from "src/positions/user-positions.model";

interface UserCreationAttrs{
    name:string;
    email:string;
    phone:string;
    position_id:number;
    photo:string;
    token:string;
}


@Table({tableName:'users'})
export class User extends Model<User>{

    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    
    @Column({type:DataType.STRING,allowNull:false})
    name:string;

    @Column({type:DataType.STRING,allowNull:false})
    email:string;
    
    @Column({type:DataType.STRING,allowNull:false})
    phone:string;
    
    @Column({type:DataType.INTEGER,allowNull:false})
    position_id:number;
    

    @Column({type:DataType.STRING,allowNull:false})
    photo:string;

    @Column({type:DataType.STRING,allowNull:false, unique:true})
    token:string;

    @BelongsToMany(()=> Positions, ()=>UserPositions)
    positions: Positions[];
}