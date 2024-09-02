import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mangoose from "mongoose";
import { Book } from '../models/bookModel.js';
import bookRoute from './routes/booksRoutes.js';

const app = express();

app.use(express.json);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send("welcome To MERN Stack Tutorial");
});

app.use('/books', bookRoute);

mangoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log("App listening to port: ${PORT}");
    });
  })
  .catch((error) => {
    console.log(error);
  });
