const express=require('express')
const slz=require('../util/database')
const { default: axios } = require('axios');
const fsales_api=require('../util/freshsales')
const Contact=require('../models/contact');




exports.postCreateContact=(req,res,next)=>
{
    
    const new_first_name=req.body.first_name;
    const new_last_name=req.body.last_name;
    const new_email=req.body.email;
    const new_mobile_number=req.body.mobile_number;
    const data_store=req.params.data_store;
    const new_contact={
        first_name:new_first_name,
        last_name:new_last_name,
        mobile_number:new_mobile_number,
        email:new_email
    }
    const ob={contact:new_contact}
    console.log(ob)
    const crm_url=fsales_api.url;
    //console.log(new_url)
    if(data_store==="CRM")
    {

        axios.post(crm_url,{contact:new_contact},{
            headers:fsales_api.header
        }).
        then((response)=>
            {
                res.send(response.data);
            })
        .catch(err=>
            {
                console.log(err)
                res.send("User Already Present Or Email ID is similar to another user")
            })
    }
    else if(data_store==="DATABASE")
    {
        Contact.findOne({where:{email:new_email}})
        .then(contact=>
            {
                if(contact)
                {
                    return res.send("Email already present, cannot have duplicate emails");
                }
                else
                {
                    return Contact.create(new_contact)
                    .then((contact)=>
                    {
                        res.send(contact);
                        console.log("Success")
                    })

                }
            })
        .catch(err=>
            {
                console.log(err)
            })
    }
    else
    {
        res.send("Invalid Parameter");
    }
}
exports.getContact=(req,res,next)=>
    {
        const contact_id=req.body.contact_id;
        const data_store=req.params.data_store;
        const crm_url=fsales_api.url+"/"+contact_id 
        const config={headers:fsales_api.header};
        if(data_store==="CRM")
        {
            //console.log("Inside")
            
            axios.get(crm_url,
                {headers: fsales_api.header}
            )
                
            .then(response=>
            {   
                console.log(response)

                res.send(response.data.contact)
            })
            .catch(err=>
                {

                    console.log(err)
                    res.send("Not Found")
                })
        }
        else if(data_store==="DATABASE")
        {
            Contact.findByPk(contact_id)
            .then(contact=>{
                if(contact)
                {
                    console.log("Found");
                    return res.send(contact)
                }
                else
                {
                    return res.send("Not Found");
                }
                }
            )
            .catch(err=>
                {
                    console.log(err)
                })
        }
    }
exports.putUpdateContact=(req,res,next)=>
    {
        
        const contact_id=req.body.contact_id
        const updated_email=req.body.new_email  
        const updated_mob_num=req.body.new_mobile_number;
        const data_store=req.params.data_store; 
        const crm_url=fsales_api.url+"/"+contact_id
        const updated_contact={email:updated_email,mobile_number:updated_mob_num}
        //const ob=
        if(data_store==="CRM")
        {

            axios.put(crm_url,{contact:updated_contact},{
                headers:fsales_api.header
            }).
            then((response)=>
                {
                    console.log("Updated")
                    res.send(response.data.contact);
                })
            .catch(err=>
                {
                    console.log(err)
                    res.send("User not Found")
                })
        }
        else if(data_store==="DATABASE")
        {
            Contact.findOne({where:{contact_id:contact_id}})
            .then(contact=>
                {
                    if(contact)
                    {
                        console.log(contact)
                        contact.email=updated_email;
                        contact.mobile_number=updated_mob_num
                        console.log("Success");
                        res.send(contact)

                        return contact.save()
                    }
                    else
                    {
                        return res.send("Not Found")
                    }
                })
        }
    }
exports.deleteContact=(req,res,next)=>
    {
        const contact_id=req.body.contact_id
        const data_store=req.params.data_store; 
        const new_url=fsales_api.url+"/"+contact_id
        
        
        if(data_store==="CRM")
        {

        axios.delete(new_url,{
            headers:fsales_api.header
        }).
        then(()=>
            {
                res.send("Deleted Succesfully");
            })
        .catch(err=>
            {
                console.log(err)
                res.send("Unsuccesfull")
            })
        }
        else if(data_store==="DATABASE")
        {
            
            
            Contact.findOne({where:{contact_id:contact_id}})
            .then(contact=>
                {
                    
                    if(contact)
                    {
                        res.send("Deleted Succesfully")
                        return contact.destroy();
                    
                    }
                    else
                    {
                        return res.send("Not Found")   
                    }
                })
            .catch(err=>
                {
                    console.log(err)
                })
        }

    }
