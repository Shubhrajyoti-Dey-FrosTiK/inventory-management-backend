import express from 'express'
import mongoose from 'mongoose';
import Enterprise from '../models/Enterprise';
import Order from '../models/Order';

const router=express.Router();

interface OrderPost {
    body : {
        _id? : any,
        ProductName : string,
        ProductNameString : String,
        Unit : String,
        Quantity : Number,
        Supplier : string,
        Contractor : string,
        Invoice : String,
        DeliveryLocation : String,
        Warehouse : string,
    },
    headers : {
        email : String
    }
}

interface OrderPostByWarehouse {
    body : {
        ProductName : string,
        Unit : String,
        Quantity : Number,
        AvailableStock : String,
        Comments : String,
        ApproveStatus : String,
        Contractor : string,
        Invoice : String,
        DeliveryLocation : String
        Warehouse : string,
        ApproverID : string
    }
}

interface EnterpriseGetByInvoice {
    body : {
        Invoice : String
    },
    headers : {
        email : String
    }
}

router.post("/",async (request : OrderPost,response : any) =>  {
    try {
        let data = {
            ...request.body,
            _id : new mongoose.Types.ObjectId(),
            ApproveStatus : 'no',
            Comments : []
        }
        
        let newOrder = new Order(data)
        let validationFail = newOrder.validateSync()
        if(!validationFail){
            Enterprise.findOne({
                EmailID : request.headers.email
            },async function(err : any , enterprise : any){
                if( ! err ) {
                    enterprise.Orders.push(data._id)
                    newOrder.save();   
                    enterprise.save();
                    response.send("New Order Request added")     

                }else{
                    response.send("User Not Found")
                }
            })    
        }else{response.send(validationFail)}   
    } catch (error) {
        response.status(500).send(error)
    }
})

router.post("/warehouse/",async (request : OrderPostByWarehouse,response : any) =>  {
    try {
        Order.findOne({
            Invoice : request.body.Invoice
        },async function(err :any , order : any){
            order.ApprovedStatus = request.body.ApproveStatus;
            order.ApproverID = request.body.ApproverID;
            order.Comments.push(request.body.Comments);
            order.save();
        })   
        response.send("Request Approval Updated");
    } catch (error) {
        response.status(500).send({"Error" : error})
    }
})

router.get("/",async (request : any,response : any) =>  {
    try {
        Order.find({ApproveStatus : 'no',})
        .populate(["ProductName","Supplier","Contractor","Warehouse","ApproverID"])
        .exec(function(err : any,stock : any){
            response.send(stock);
        })
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/invoice/",async (request : EnterpriseGetByInvoice,response : any) =>  {
    try {
        Order.find({Invoice : request.body.Invoice})
        .populate(["ProductName","Supplier","Contractor","Warehouse","ApproverID"])
        .exec(function(err : any,stock : any){
            response.send(stock);
        })
    } catch (error) {
        response.status(500).send(error)
    }
})

export default router;