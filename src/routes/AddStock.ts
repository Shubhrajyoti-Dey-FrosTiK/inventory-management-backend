import express from "express";
import mongoose from "mongoose";
import AddStock from "../models/AddStock";
import Item from "../models/Item";
import Warehouse from "../models/Warehouse";

const router = express.Router();

interface AddStockPost {
  body: Array<{
    ProductName: string;
    Type: string;
    SubType: string;
    Unit: String;
    Quantity: Number;
    Supplier: string;
    Warehouse: string;
    Invoice: String;
    User: string;
  }>;
}
interface EnterpriseGetByInvoice {
  body: {
    Invoice: String;
  };
}

router.post("/", async (request: AddStockPost, response: any) => {
  console.log(request.body);

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    for (let i = 0; i < request.body.length; i++) {
      await Item.findOneAndUpdate(
        {
          Name: request.body[i].ProductName,
        },
        {
          $inc: {
            Quantity: request.body[i].Quantity,
          },
        },
        { useFindAndModify: false, session: session }
      ).then(async function (res: any) {
        console.log("Item ID : ", res._id);

        await AddStock.create(
          [
            {
              Quantity: request.body[i].Quantity,
              Unit: request.body[i].Unit,
              ProductName: res._id,
              Supplier: request.body[i].Supplier,
              Warehouse: request.body[i].Warehouse,
              User: request.body[i].User,
              Invoice: request.body[i].Invoice,
            },
          ],
          {
            session: session,
          }
        );
        await Warehouse.findOneAndUpdate(
          {
            _id: request.body[i].Warehouse,
            "Items.ItemDetails": res._id,
          },
          {
            $inc: {
              "Items.$.Quantity": request.body[i].Quantity,
            },
          },
          { useFindAndModify: false, session: session }
        ).then(async function (response: any) {
          console.log("Response :", response);
          if (!response) {
            await Warehouse.findOneAndUpdate(
              {
                _id: request.body[i].Warehouse,
              },
              {
                $push: {
                  Items: {
                    ItemDetails: res._id,
                    Quantity: request.body[i].Quantity,
                  },
                },
              },
              { useFindAndModify: false, session: session }
            ).then((r: any) => console.log(r));
          }
        });
      });
    }
    await session.commitTransaction();
    session.endSession();
    response.send({ message: "Item and Stock updated" });
  } catch (error) {
    console.log(error);

    response.status(500).send({ Error: error });
  }
});

router.get("/", async (request: any, response: any) => {
  try {
    AddStock.find()
      .populate(["ProductName", "Supplier", "Warehouse", "User"])
      .exec(function (err: any, stock: any) {
        response.send(stock);
      });
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get(
  "/invoice/",
  async (request: EnterpriseGetByInvoice, response: any) => {
    try {
      AddStock.find({ Invoice: request.body.Invoice })
        .populate(["ProductName", "Supplier", "Warehouse", "User"])
        .exec(function (err: any, stock: any) {
          response.send(stock);
        });
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

export default router;
