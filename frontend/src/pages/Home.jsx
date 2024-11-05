import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css"
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        axios.get("https://books-store1.vercel.app/books")
            .then((res) => {
                const sortedBooks = res.data.data.sort((a, b) => a.id - b.id);
                setBooks(sortedBooks);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }, [])
    return (
            <div class="table-container">
            <h1>Books List</h1>
            <a href="/books/create" class="add-button">+ Add New Book</a>
            {isLoading ? (
                <Spinner />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publish Year</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publishYear}</td>
                                <td class="operations">
                                    <Link to={`/books/details/${book.id}`}>
                                        <i class="fas fa-info-circle"></i>
                                    </Link>
                                    <Link to={`/books/edit/${book.id}`}>
                                        <i class="fas fa-edit"></i>
                                    </Link>
                                    <Link to={`/books/delete/${book.id}`}>
                                        <i class="fas fa-trash"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
        </div>
    )
}
export default Home