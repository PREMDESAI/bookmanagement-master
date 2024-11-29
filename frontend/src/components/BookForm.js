import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios'

const BookForm = ({ selectedBook, onFormSubmit, clearSelectedBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); // State for error message  

  useEffect(() => {
    if (selectedBook) {
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setDescription(selectedBook.description);
    } else {
      resetForm();
    }
  }, [selectedBook]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setError(''); // Clear error on reset
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    const bookData = { title, author, description };

    try {
      if (selectedBook) {
        // Update book
        await axiosInstance.put(`/books/${selectedBook.id}`, bookData);
        clearSelectedBook();
      } else {
        // Add book
        await axiosInstance.post('/books', bookData);
      }
      onFormSubmit();
      resetForm();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle duplicate book title error
        setError(error.response.data.message);
      } else {
        console.error('Error adding/updating book:', error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{selectedBook ? 'Edit Book' : 'Add New Book'}</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            {selectedBook ? 'Update Book' : 'Add Book'}
          </button>
          <button
            type="button"
            onClick={clearSelectedBook}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;