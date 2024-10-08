import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mangoose from "mongoose";
import { Book } from '../models/bookModel.js';
import bookRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json);

//app.use(cors());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        ALLOWEDhEADERS: ['cONTENT-tYPE'],
    })
);

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
