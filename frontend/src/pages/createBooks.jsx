import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBooks.css';

const CreateBooks = () => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        author: '',
        publishYear: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://books-store1.vercel.app/books', formData)
            .then(() => navigate('/'))
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="create-book-container">
            <h2>Create Book</h2>
            <form onSubmit={handleSubmit} className="create-book-form">
                <label htmlFor="id">ID</label>
                <input
                    type="number"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="publishYear">Publish Year</label>
                <input
                    type="number"
                    name="publishYear"
                    value={formData.publishYear}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="save-btn">Save</button>
                <button onClick={() => navigate(-1)} className="back-btn">Back</button>

            </form>
        </div>
    );
};

export default CreateBooks;

