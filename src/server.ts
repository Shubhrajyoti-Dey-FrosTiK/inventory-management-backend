import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Enterprise from './routes/Enterprise';
import Item from './routes/Items';
import Warehouse from './routes/Warehouse';
import AddStock from './routes/AddStock';
import Order from './routes/Order';
import User from './routes/User';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const router=express.Router();
const app=express();
dotenv.config();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())

/**-------- Paths ------------------- */

app.use("/api/enterprise/",Enterprise);
app.use("/api/item/",Item);
app.use("/api/warehouse/",Warehouse);
app.use("/api/addStock/",AddStock);
app.use("/api/order/",Order);
app.use("/api/user/",User);

/**-------- Paths ------------------- */

app.all('*', async () => {
	throw new NotFoundError();
});
app.use(errorHandler);

mongoose.connect(process.env.MONGO_CONNECTION_URL!,  // connecting mongoose to mongoDb 
{useNewUrlParser: true,useUnifiedTopology: true}).then(()=> console.log("Connection Established"));

const PORT=process.env.PORT || 5001;

app.use("/",(request,response) => {
    // response.sendFile(path.join(__dirname,"client","build","index.html"))
    response.send("Default Response")
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});