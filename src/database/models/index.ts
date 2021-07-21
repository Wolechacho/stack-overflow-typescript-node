import { Sequelize } from 'sequelize'
import {development} from '../config/database.json'


const { host,dialect,dbport,database,username } = development;
const connectionUri = `${dialect}://${username}:@${host}:${dbport}/${database}`;

const sequelize = new Sequelize(connectionUri);


export default sequelize