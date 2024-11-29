import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../axios'


const BookList = ({ onEdit }) => {
  const [books, setBooks] = useState([]);  
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  

  const fetchBooks = useCallback(async (page, search) => {
    try {
      const response = await axiosInstance.get('/books', {
        params: {
          page,
          title: search,
          limit,
        },
      });
      setBooks(response.data.books);
      // Optionally set total pages here if your backend returns total count
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, [limit]); 

  const deleteBook = async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  useEffect(() => {    
    fetchBooks(page, search);
  }, [fetchBooks, page, search]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title"
          className="border rounded-lg p-2"
        />
      </div>

      {books.length > 0 ? (
        <ul className="space-y-2">
          {books.map((book) => (
            <li key={book.id} className="flex justify-between items-center p-4 border rounded-lg shadow">
              <div>
                <h2 className="font-semibold">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-500">{book.description}</p>
              </div>
              <div>
                <button onClick={() => onEdit(book)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => deleteBook(book.id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found</p>
      )}

      <div className="mt-4 flex justify-between items-center">
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Next
        </button>
      </div>      
    </div>
  );
};

export default BookList;