import mongoose from 'mongoose'

const isNumeric = (Num : any) => {
    return !isNaN(Num);
}

const ItemSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Unit : {
        type : String,
        require : true,
        enum : ['nos','metre','kg','pieces'],
        default: 'nos'
    },
    Type : {
        type : String,
        required : true
    },
    SubType : {
        type : String,
        required : true
    },
    Quantity : {
        type : Number,
        required : true,
        validate : [ isNumeric , "It should be a number" ]
    }
});

export default mongoose.model('Item', ItemSchema);