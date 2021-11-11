import mongoose, { Schema } from 'mongoose'

const validateUnit = (Type : String) => {
    return Type.toUpperCase() === "NOS" || Type.toUpperCase() === "METRE" || Type.toUpperCase() === "KG"; 
}

const isNumeric = (Num : any) => {
    return !isNaN(Num);
}

const OrderSchema = new mongoose.Schema({
    ProductName : {
        type : Schema.Types.ObjectId,
        ref : "Item",
        required : true
    },
    Unit : {
        type : String,
        enum : ['nos','metre','kg'],
        default: 'nos'
    },
    Quantity : {
        type : Number,
        required : true,
        validate : [ isNumeric ,"Quantity should be a numeric value" ]
    },
    Supplier : {
        type : Schema.Types.ObjectId,
        ref : "Enterprise",
        required : true
    },
    Contractor : {
        type : Schema.Types.ObjectId,
        ref : "Enterprise",
        required : true
    },
    Invoice : {
        type : String,
        required : true
    },
    DeliveryLocation : {
        type : String,
        required : true
    },
    Warehouse : {
        type : Schema.Types.ObjectId,
        ref : "Warehouse",
        required : true
    },
    ApproveStatus : {
        type : String,
        required : true,
        enum : ['no','yes'],
        default : 'no'
    },
    ApproverID : {
        type : Schema.Types.ObjectId,
        ref : "Enterprise",
        required : false
    },
    Comments : [{
        type : String,
        required : true,
    }],
});

export default mongoose.model('Order', OrderSchema);