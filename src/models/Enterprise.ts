import mongoose,{ Schema } from 'mongoose'

const validatePAN = (PAN : String) => {
    return PAN.length == 10;
}

const validateGST = (GST : String) => {
    return GST.length == 15;
}

const validatePINCode = (PINCode : String) => {
    return PINCode.length == 6;
}

const validatePhoneNo = (PhoneNo : String) => {
    return PhoneNo.length == 10;
}

const validateType = (Type : String) => {
    return Type.toUpperCase() === "SUPPLIER" || Type.toUpperCase() === "CONTRACTOR" || Type.toUpperCase() === "BUYER"; 
}

const isNumeric = (Num : any) => {
    return !isNaN(Num);
}

const EnterpriseSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
    PAN : {
        type : String,
        required : true,
        validate : [ validatePAN , "PAN Number should be of exactly 10 letters" ] 
    },
    GSTNumber : {
        type : String,
        required : true,
        validate : [ validateGST , "GST Number should be of exactly 15 letters" ] 
    },
    PINCode : {
        type : String,
        required : true,
        validate : [
            { validator :isNumeric , msg :"PIN Code should contain only numbers"},
            { validator :validatePINCode , msg :"PIN Code should be of exactly 6 digits"} 
        ] 
    },
    PhoneNo : {
        type : String,
        required : true,
        validate : [
            { validator :isNumeric , msg :"Phone number should contain only numbers"},
            { validator :validatePhoneNo, msg :"Phone number should be of exactly 10 digits"} 
        ] 
    },
    EmailID : {
        type : String,
        required : true
    },
    Type : {
        type : String,
        required : true,
        validate : validateType
    },
    Orders : [{
        type : Schema.Types.ObjectId,
        ref : "Order",
        required : true
    }]
});

export default mongoose.model('Enterprise', EnterpriseSchema);