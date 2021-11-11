import express from 'express'
import Enterprise from '../models/Enterprise';

const router=express.Router();

interface EnterprisePost {
    body : {
        Name : String,
        Address : String,
        PAN : String,
        GSTNumber : String,
        PINCode : String,
        PhoneNo : String,
        EmailID : String,
        Type : String,
        Orders : any
    }
}

interface EnterpriseGetByEmail {
    body : {
        EmailID : String,
    }
}

router.post("/",async (request : EnterprisePost,response : any) =>  {
    // console.log(request.body);
    try {
        request.body.Orders = [];
        let newEnterprise = new Enterprise(request.body);
        let validationFail = newEnterprise.validateSync()
        if(!validationFail){
            newEnterprise.save();
            response.status(200).send({
                message : "New enterprise added"
            })     
        }else{response.status(400).send(validationFail)}   
    } catch (error) {
        response.status(400).send(error)
    }
})

router.get("/",async (request : any,response : any) => {
    try {
        let finder = await Enterprise.find().populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/supplier/",async (request : any,response : any) => {
    try {
        let finder = await Enterprise.find({Type : "Supplier"}).populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/buyer/",async (request : any,response : any) => {
    try {
        let finder = await Enterprise.find({Type : "Buyer"}).populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/contractor/",async (request : any,response : any) => {
    try {
        let finder = await Enterprise.find({Type : "Buyer"}).populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/supplier/search/email/",async (request : any,response : any) => {
    try {
        let finder = await Enterprise.find({Type : "Supplier",EmailID : request.headers.email}).populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/buyer/search/email/",async (request : any,response : any) => {
    try {
        let finder = await Enterprise.find({Type : "Buyer",EmailID : request.headers.email}).populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/contractor/search/email/",async (request : any,response : any) => {
    try {
        let finder = await Enterprise.find({Type : "Buyer",EmailID : request.headers.email}).populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/email/",async (request : EnterpriseGetByEmail,response : any) => {
    try {
        let finder = await Enterprise.find({
            EmailID : request.body.EmailID
        }).populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

export default router;