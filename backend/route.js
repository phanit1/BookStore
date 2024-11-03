import express from "express";
import { Book } from "./model.js";

const router = express.Router();

const validateBooks = (data) => {
    if (!data.id || !data.title || !data.author || !data.publishYear) {
        return false
    } else {
        return true
    }
}

//Route to Post the books in to DataBase
router.post("/", async (req, res) => {
    try {
        if (validateBooks(req.body)) {
            const newBook = {
                id: req.body.id,
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear,
            }
            console.log(newBook, "nB")
            const insertBook = await Book.create(newBook)
            console.log(insertBook, "iB")
            // res.status(200).send("A New Book Entry is added successfully.")
            res.status(200).json({
                message: "A New Book Entry is added successfully.",
                data: insertBook
            })
        }
        else {
            res.status(400).json({
                message: "send all required fields: title,author,publishYear"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Route to Get all the Books from DB
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        if (books.length > 0) {
            res.status(200).json({
                message: "Ok",
                count: books.length,
                data: books
            })
        }
        else {
            res.status(404).json({
                message: "Data Not Found",
                count: 0,
                data: books
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Route to fetch the data by using ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.find({ id: id });
        res.status(200).send(books)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Route for Updating the book
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = {
            id: id,
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const result = await Book.findOneAndUpdate({ id: id }, updatedBook, { new: true });
        console.log("result", result);
        if (!result) {
            console.log("coming here");
            return res.status(404).json({ message: "Book not found" })
        } else {
            return res.status(200).json({ message: `Book with ${id} updated successfully` })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Delete the Book
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.deleteOne({ id: id });
        if (result.deletedCount > 0) {
            return res.status(200).json({
                message: "Book Deleted Successfully"
            })
        } else {
            return res.status(404).json({ message: "Book not found" })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default router;