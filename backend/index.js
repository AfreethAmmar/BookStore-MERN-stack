import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mangoose from "mongoose";

const app = express();

app.use(express.json);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send("welcome To MERN Stack Tutorial");
});

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all require feilds: title, author, publishayear",
      });
    }
    const newBook = {
        title: request.body.title,
        author: request.body.author,
        puplishYear: request.body.puplishYear,
        
    };

    const book = await book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get('/books', async (request, response) => {
    try{
        const book = await book.find({});

        return response.status(200).json({
            count: books.length,
            data:books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

app.get('/books/:id', async (request, response) => {
    try{

        const { id } = request.params;

        const book = await book.findById(id);

        return response.status(200).json(book)
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

app.put('/books/:id',async (request, response) => {

    try {
        if (
          !request.body.title ||
          !request.body.author ||
          !request.body.publishYear
        ) {  return response.status(400).send({
            message: "send all require feilds: title, author, publishayear",
          });
        }
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: ' Book not fount'})
        }
        return response.status(200).send({ message: 'Book updated successfully'});
    }  catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }      
});

app.delete('/books/:id', async (request, response) => {
    try{

        const { id } = request.params;

        const book = await book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: ' Book not fount'})
        }
        return response.status(200).send({ message: 'Book deleted successfully'});
    }  catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }     

});

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
