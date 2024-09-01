import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mangoose from 'mongoose';

const app = express();

app.get("/", (request, response) => {
  console.log(request) 
  return response.status(234).send("welcome To MERN Stack Tutorial");
});




mangoose
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log("App listening to port: ${PORT}");
      });
})
.catch((error) => {
    console.log(error);
});
