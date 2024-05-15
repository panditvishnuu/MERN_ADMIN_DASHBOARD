import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";


// import Routes
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";


// data import
import User from "./models/User.js";
import {dataUser} from "./data/index.js"


// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());


// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


// mongoose setup
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    app.listen(PORT, () => console.log(`DataBase Connected, Server Port : ${PORT}`));
    User.insertMany(dataUser);

}).catch((error) => console.log(`${error} did not connect`));