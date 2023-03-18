import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import userAPI from "./routes/user.js"; 
import User from "./models/user.js";
import Product from "./models/product.js";


/* CONFIG */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/* API */

app.use("/user", userAPI);


/* MONGO */

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, ()=> console.log(`Server connect on port ${PORT}`)) 
    // User.insertMany(dataUser); 
}).catch((error) => console.log(`${error}`))