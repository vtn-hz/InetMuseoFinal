import {Sequelize} from "sequelize";

const conexion = new Sequelize('museo','root','',{
    host: '127.0.0.1',
    dialect: 'mysql'
});

/*Hacer local*/ 

export default conexion;