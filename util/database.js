const {Sequelize}=require('sequelize')
const slz=new Sequelize('crudAPI','root','12345',
{dialect:'mysql',
host:'localhost'});
module.exports=slz