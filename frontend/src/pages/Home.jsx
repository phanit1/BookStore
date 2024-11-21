import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css"
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

// const Home = () => {
//     const [books, setBooks] = useState([]);
//     const [isLoading, setLoading] = useState(false)
//     useEffect(() => {
//         setLoading(true);
//         axios.get("https://books-store1.vercel.app/books")
//             .then((res) => {
//                 const sortedBooks = res.data.data.sort((a, b) => a.id - b.id);
//                 setBooks(sortedBooks);
//                 setLoading(false)
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setLoading(false)
//             })
//     }, [])
//     return (
//             <div class="table-container">
//             <h1>Books List</h1>
//             <a href="/books/create" class="add-button">+ Add New Book</a>
//             {isLoading ? (
//                 <Spinner />
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>No</th>
//                             <th>Title</th>
//                             <th>Author</th>
//                             <th>Publish Year</th>
//                             <th>Operations</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {books.map((book, index) => (
//                             <tr>
//                                 <td>{book.id}</td>
//                                 <td>{book.title}</td>
//                                 <td>{book.author}</td>
//                                 <td>{book.publishYear}</td>
//                                 <td class="operations">
//                                     <Link to={`/books/details/${book.id}`}>
//                                         <i class="fas fa-info-circle"></i>
//                                     </Link>
//                                     <Link to={`/books/edit/${book.id}`}>
//                                         <i class="fas fa-edit"></i>
//                                     </Link>
//                                     <Link to={`/books/delete/${book.id}`}>
//                                         <i class="fas fa-trash"></i>
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>)}
//         </div>
//     )
// }
// export default Home

const Home = () => {
    const [books, setBooks] = useState([]);
    const [titleSearch, setTitleSearch] = useState('');
    const [authorSearch, setAuthorSearch] = useState('');
    const [yearSearch, setYearSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

    useEffect(() => {
        axios.get('https://books-store1.vercel.app/books')
            .then(res => setBooks(res.data.data))
            .catch(error => console.error(error));
    }, []);

    // Handle Sorting
    const handleSort = (key) => {
        setSortConfig((prevSortConfig) => ({
            key,
            direction: prevSortConfig.key === key && prevSortConfig.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    // Filter and sort books
    const filteredBooks = books
        .filter(book =>
            book.title.toLowerCase().includes(titleSearch.toLowerCase()) &&
            book.author.toLowerCase().includes(authorSearch.toLowerCase()) &&
            (yearSearch === '' || book.publishYear.toString().includes(yearSearch))
        )
        .sort((a, b) => {
            if (sortConfig.key) {
                const isAsc = sortConfig.direction === 'asc' ? 1 : -1;
                if (a[sortConfig.key] < b[sortConfig.key]) return -1 * isAsc;
                if (a[sortConfig.key] > b[sortConfig.key]) return 1 * isAsc;
            }
            return 0;
        });

    return (
        <div>
            <h1>Books List</h1>
            <a href="/books/create" class="add-button">+ Add New Book</a>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>
                                <button onClick={() => handleSort('title')}>Title</button>
                                <input
                                    type="text"
                                    placeholder="Search by title"
                                    value={titleSearch}
                                    onChange={(e) => setTitleSearch(e.target.value)}
                                    style={{ marginTop: '5px', width: '100%' }}
                                />
                            </th>
                            <th>
                                <button onClick={() => handleSort('author')}>Author</button>
                                <input
                                    type="text"
                                    placeholder="Search by author"
                                    value={authorSearch}
                                    onChange={(e) => setAuthorSearch(e.target.value)}
                                    style={{ marginTop: '5px', width: '100%' }}
                                />
                            </th>
                            <th>
                                <button onClick={() => handleSort('publishYear')}>Publish Year</button>
                                <input
                                    type="text"
                                    placeholder="Search by year"
                                    value={yearSearch}
                                    onChange={(e) => setYearSearch(e.target.value)}
                                    style={{ marginTop: '5px', width: '100%' }}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publishYear}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
