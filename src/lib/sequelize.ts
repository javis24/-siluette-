import { Sequelize } from 'sequelize';


const db = new Sequelize(
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD as string,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'), 
    logging: false,
  }
);

export default db;
