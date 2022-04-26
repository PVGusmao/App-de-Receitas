import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import WillOpen from './components/WillOpen';
import UserProvider from './context/UserProvider';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <WillOpen />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
