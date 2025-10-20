//Architectural pattern ; MVC DI MVP;

//MVC = MODEL VIEW CONTROLLER 


//design pattern ; Middlewaare , Decotar

import dotenv from "dotenv";
dotenv.config();
// console.log("PORT",process.env.PORT);
// console.log("MONGO_URL",process.env.MONGO_URL);
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MONGODB connection success");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function() {
        console.log(`the server is running successfull on port:${PORT}`);
    })
  })
  .catch((err) => console.log("ERROR on connection MONGODB", err));
