import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBook.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const EditBook = () => {
    const { id } = useParams();
    const [publishDate, setPublishDate] = useState(new Date());
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        author: '',
        publishYear: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://books-store1.vercel.app/books/${id}`)
            .then((response) => setFormData(response.data[0]))
            .catch((error) => console.error('Error fetching book details:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDate = format(publishDate, 'dd-MM-yyyy');
        formData.publishYear = formattedDate;
        console.log(formData, "FD")
        axios.put(`https://books-store1.vercel.app/books/${id}`, formData)
            .then(() => navigate('/'))
            .catch((error) => console.error('Error updating book:', error));
    };

    return (
        <div className="edit-book-container">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit} className="edit-book-form">
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
                <DatePicker
                    name="publishYear"
                    selected={publishDate}
                    onChange={(date) => setPublishDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="date-picker-input"
                    required
                />
                <button type="submit" className="save-btn">Save Changes</button>
                <button onClick={() => navigate(-1)} className="back-btn">Back</button>

            </form>
        </div>
    );
};

export default EditBook;
