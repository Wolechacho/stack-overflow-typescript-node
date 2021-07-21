import { Model,DataTypes } from 'sequelize'
import sequelize from '../models/index'


export class User extends Model {
}
User.init(
  {
    userId: {
       type: DataTypes.UUIDV4,
       allowNull: false,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
    },
    username: {
       type: DataTypes.STRING,
       allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type : DataTypes.STRING,
         allowNull: false
    } 
  },
  { sequelize, modelName: 'User',timestamps: false
});



