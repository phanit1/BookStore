import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export const Book = mongoose.model("BookStore", bookSchema)