import {Sequelize} from "sequelize";

const conexion = new Sequelize('sql10520960','sql10520960','M1li5HeQ67',{
    host: 'sql10.freemysqlhosting.net',
    dialect: 'mysql'
});

export default conexion;