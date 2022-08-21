const {Sequelize}=require('sequelize')
const slz=require('../util/database')
module.exports=slz.define('contacts',{
    contact_id:
    {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    first_name:
    {
        type:Sequelize.STRING,
        allowNull:false,
    },
    last_name:
    {
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:
    {
        type:Sequelize.STRING,
        allowNull:false,
        
        
    },
    mobile_number:
    {
        type:Sequelize.STRING,
        allowNull:true,
        
    },

})