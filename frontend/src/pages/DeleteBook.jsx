import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./DeleteBook.css"

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
                alert("An error occurred. Please check the console.");
                console.error(error);
            });
    };

    return (
        <div className="delete-page">
            <BackButton />
            <h1>Delete Book</h1>
            {isLoading ? <Spinner /> : null}
            <div className="delete-container">
                <h3>Are you sure you want to delete this book?</h3>
                <button
                    className="delete-button"
                    onClick={handleDeleteBook}
                >
                    Yes, Delete it
                </button>
                <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
};

export default DeleteBook;
