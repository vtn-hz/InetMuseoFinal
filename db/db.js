import {Sequelize} from "sequelize";

const DATABASE = 'museo';
const USER = 'root';
const PASSWORD = '';

const HOST = '127.0.0.1';
const DIALECT = 'mysql';

const conexion = new Sequelize(
    DATABASE, USER, PASSWORD,
    { host: HOST, dialect: DIALECT }
);

/*Hacer local*/ 

export default conexion;