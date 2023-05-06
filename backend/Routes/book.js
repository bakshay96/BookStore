const { Router } = require("express");
const bookModel = require("../models/bookModel");

const bookRouter = Router();

bookRouter.get("/books", async (req, res) => {
    try {

        // const payload = req.body;
        const bookData = await bookModel.find();
        if (bookData) {
            res.status(200).json({ "Availabel books": bookData });

        }
        else {
            res.status(401).json({ "error": "books not availabale" });
        }

    } catch (error) {

        res.status(401).json({ "error": error.message });
    }
});

//get data by id
bookRouter.get("/books/:id", async (req, res) => {
    try {

        const payload = req.body;
        const bookData = await bookModel.findById({ _id: req.params.id });
        if (bookData) {
            res.status(200).json({ "Availabel books": bookData });

        }
        else {
            res.status(401).json({ "error": "book not availabel" });
        }

    } catch (error) {

        res.status(401).json({ "error": error.message });
    }
});


//post request
bookRouter.post("/books", async (req, res) => {
    try {

        const bookData = bookModel(req.body);
        await bookData.save();
        res.status(201).json({ "Book Data": bookData });
        res.send({ "result": "Book added successfully", "Books": bookData });


    } catch (error) {

        res.status(401).json({ "error": error.message });
    }
});


//patch request for book
bookRouter.patch("/books/:id", async (req, res) => {
    try {

        const updateData = await bookModel.findByIdAndUpdate((_id = req.params.id), req.body);
        await updateData.save();
        res.status(204).json({ "Book Data": bookData });
        res.send({ "result": "Book update successfully", "updateBooks": bookData });


    } catch (error) {

        res.status(401).json({ "error": error.message });
    }
});


//delete data
bookRouter.delete("/books/:id", async (req, res) => {

    try {

        await bookModel.findByIdAndDelete({ _id: req.params.id });
        res.send({ "result": "books has been deleted" });
        res.status(202).json({ "msg": "book has been deleted" });


    } catch (error) {
        res.status(401).json({ "error": error.message });
    }
})

module.exports = bookRouter;


