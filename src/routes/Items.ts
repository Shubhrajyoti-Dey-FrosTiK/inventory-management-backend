import express from 'express'
import Item from '../models/Item';

const router=express.Router();

interface ItemsPost {
    body : {
        Name : String,
        Unit : String,
        Type : String,
        SubType : String,
        Quantity : Number,
    }
}

interface ItemsByName {
    body : {
        Name : String,
    }
}

router.post("/",async (request : ItemsPost,response : any) =>  {
    try {
        let val = await Item.updateOne({
            Name : request.body.Name,
            Unit : request.body.Unit,
            Type : request.body.Type,
            SubType : request.body.SubType,
        },{
            $inc : {
                Quantity : request.body.Quantity
            }
        })
        if(! val.nModified ) {
            let newItem = new Item(request.body);
            let validationFail = newItem.validateSync()
            if(!validationFail){
                newItem.save();
                response.send("New item added")     
            }else{response.send(validationFail)}   
        }else{
            response.send("Item Quantity updated")
        }
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/",async (request : any,response : any) =>  {
    try {
        let finder = await Item.find();
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/name/",async (request : ItemsByName,response : any) => {
    try {
        let finder = await Item.find({
            Name : request.body.Name
        });
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

export default router;