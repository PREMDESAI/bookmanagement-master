import React, { useState } from 'react';
import Login from './components/Login';
import BookManagement from './components/BookManagement'; // Your book management component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <BookManagement /> // Your book management UI
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;