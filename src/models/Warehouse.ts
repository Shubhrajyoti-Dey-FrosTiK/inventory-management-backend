import mongoose, { Schema } from "mongoose";

const WarehouseSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Items: [
    {
      ItemDetails: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      Quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Warehouse", WarehouseSchema);
