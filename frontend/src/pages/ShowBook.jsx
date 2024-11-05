import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ShowBook.css';

const ShowBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    console.log(id,"ID")
    useEffect(() => {
        axios.get(`https://books-store1.vercel.app/books/${id}`)
            .then((response) => setBook(response.data[0]))
            .catch((error) => console.error('Error:', error));
    }, [id]);
    console.log(book)
    return (
        <div className="show-book-container">
            <h2>Book Details</h2>
            
            {book ? (
                <div className="book-details">
                    <p><strong>Title:</strong> {book.title}</p>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Publish Year:</strong> {book.publishYear}</p>
                    <button onClick={() => navigate(-1)} className="back-btn">Back</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowBook;
