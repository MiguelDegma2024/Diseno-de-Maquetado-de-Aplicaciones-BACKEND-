import { Sequelize } from "sequelize-typescript";
import { Product } from '../models/product';

const connection = new Sequelize({
    database: 'sisweb_db',
    dialect: 'postgres',
    username: 'sisweb_user',
    password: 'HDK#$%Ljkwerff.89',
    storage: ':memory:',
    models: [Product]
});


async function connectionDB(){ 
    try{
        await connection.sync();
    }catch(e){
        console.log(e);
    }
}


export default connectionDB;