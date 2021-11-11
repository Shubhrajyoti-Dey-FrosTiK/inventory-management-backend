import mongoose from 'mongoose'

const WarehouseSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
    City : {
        type : String,
        required : true,
    },
});

export default mongoose.model('Warehouse', WarehouseSchema);