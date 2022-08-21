# CRUD-API
Performs CRUD operation on database or Freshsales Contacts


#IMPORTANT
in folder utils
database.js: replace 

const slz=new Sequelize('crudAPI','root','12345',
{dialect:'mysql',
host:'localhost'});
module.exports=slz

with your own mysql database  info

IN freshsale.js

const express=require('express')
const ob={url:"https://nowhere-481391998097984838.myfreshworks.com/crm/sales/api/contacts",
                    header:{'Authorization':'Token token=cET58MsPjD5LJYt0usOexA','Content-Type':'application/json'}}

module.exports=ob
replace url and authorization

End Points:

crudapi/createContact/DATABASE
,crudapi/createContact/CRM

crudapi/getContact/DATABASE
,crudapi/getContact/CRM

crudapi/deleteContact/DATABASE
,crudapi/deleteContact/CRM

crudapi/updateContact/DATABASE
,crudapi/updateContact/CRM
