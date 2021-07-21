import { Model,DataTypes } from 'sequelize'
import sequelize from '../models/index'
import { Question } from './question'
import { User } from './user'


export class Answer extends Model {
}
Answer.init(
  {
    answerId: {
       type: DataTypes.UUIDV4,
       allowNull: false,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
    },
    text:{
        type: DataTypes.TEXT,
        allowNull: false
    }
  },
  { sequelize, modelName: 'Answer',timestamps: false }
)

Answer.belongsTo(User, {
  foreignKey: 'userId'
})

Answer.belongsTo(Question, {
  foreignKey: 'questionId'
})


