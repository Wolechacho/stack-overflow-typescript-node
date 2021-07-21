import { Model,DataTypes } from 'sequelize'
import sequelize from '../models/index'
import { User } from './user'


export class Question extends Model {
}
Question.init(
  {
    questionId: {
       type: DataTypes.UUIDV4,
       allowNull: false,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
    },
    title: {
       type: DataTypes.STRING(200),
       allowNull: false
    },
    text:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    tags:{
        type : DataTypes.TEXT,
         allowNull: false
    },
    upvote:{
        type : DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    downvote:{
        type : DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    }
  },
  { sequelize, modelName: 'Question',timestamps: true }
)

Question.belongsTo(User, {
  foreignKey: 'userId'
})

// Question.hasMany(Answer, {
//   foreignKey: 'questionId',
//   as : 'answers'
// })

