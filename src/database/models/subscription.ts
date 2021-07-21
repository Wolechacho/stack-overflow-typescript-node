import { Model,DataTypes } from 'sequelize'
import sequelize from '../models/index'
import { Question } from './question'
import { User } from './user'


export class Subscription extends Model {
}
Subscription.init(
  {
    subscriptionId: {
       type: DataTypes.UUIDV4,
       allowNull: false,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
    },
    questionId: {
       type: DataTypes.UUIDV4,
       allowNull: false,
    },
    userId:{
        type: DataTypes.UUIDV4,
        allowNull: false
    }
  },
  { sequelize, modelName: 'Subscription',timestamps: false }
)

Subscription.belongsTo(User, {
  foreignKey: 'userId'
})

Subscription.belongsTo(Question, {
  foreignKey: 'questionId'
})


