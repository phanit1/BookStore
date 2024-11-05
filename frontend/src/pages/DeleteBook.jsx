import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './DeleteBook.css';

const DeleteBook = () => {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteBook = () => {
        setLoading(true);
        axios.delete(`https://books-store1.vercel.app/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                alert("An error occurred. Please check the console for more details.");
                console.log(error);
            });
    };

    return (
        <div className="delete-book-container">
            <BackButton />
            <h1 className="delete-book-title">Delete Book</h1>
            {isLoading && <Spinner />}
            <div className="delete-book-content">
                <h3 className="delete-book-confirm">Are you sure you want to delete this book?</h3>
                <button
                    className="delete-book-button"
                    onClick={handleDeleteBook}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    );
};

export default DeleteBook;
