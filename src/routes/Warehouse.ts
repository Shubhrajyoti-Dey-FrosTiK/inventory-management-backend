import express from 'express'
import Warehouse from '../models/Warehouse';

const router=express.Router();

interface WarehousesPost {
    body : {
        Address : String,
        City : String,
    }
}

interface WarehousesGetByCity {
    body : {
        Address : String,
        City : String,
    }
}

router.post("/",async (request : WarehousesPost,response : any) =>  {
    try {
        let mewWarehouse = new Warehouse(request.body);
        let validationFail = mewWarehouse.validateSync()
        if(!validationFail){
            mewWarehouse.save();
            response.status(200).send({
                message : "New warehouse added"
            })     
        }else{response.send(validationFail)}   
    } catch (error) {
        response.status(500).send("Some error happened")
    }
})

router.get("/",async (request : any,response : any) =>  {
    try {
        let finder = await Warehouse.find();
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/city/",async (request : WarehousesGetByCity,response : any) =>  {
    try {
        let finder = await Warehouse.find({
            City : request.body.City
        });
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

export default router;