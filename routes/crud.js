const router=require('express').Router()
const crudController=require('../controller/crud')
router.post('/createContact/:data_store',crudController.postCreateContact)
router.post('/getContact/:data_store',crudController.getContact)
router.post('/updateContact/:data_store',crudController.putUpdateContact)
router.post('/deleteContact/:data_store',crudController.deleteContact)
module.exports=router