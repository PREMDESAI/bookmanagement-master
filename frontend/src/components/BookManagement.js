import React, { useState } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';

const BookManagement = () => {
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAddBookClick = () => {
    setIsAddingBook(true);
    setSelectedBook(null); // Reset selected book if in edit mode
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsAddingBook(true); // Show form to edit the book
  };

  const handleFormSubmit = () => {
    setIsAddingBook(false);
  };

  const handleCancel = () => {
    setIsAddingBook(false);
    setSelectedBook(null);
  };

  return (
    <div className="App">
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-center text-3xl font-bold">Book Management App</h1>
      </header>

      <main className="container mx-auto p-4">
        {/* Toggle between the book list and add/edit form */}
        {!isAddingBook ? (
          <div className="text-center">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-full mb-4"
              onClick={handleAddBookClick}
            >
              Add New Book
            </button>
            <BookList onEdit={handleEditBook} />
          </div>
        ) : (
          <div>
            <BookForm
              selectedBook={selectedBook}
              onFormSubmit={handleFormSubmit}
              clearSelectedBook={handleCancel}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default BookManagement;