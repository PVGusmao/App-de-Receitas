import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import WillOpen from './components/WillOpen';

function App() {
  return (
    <BrowserRouter>
      <WillOpen />
    </BrowserRouter>
  );
}

export default App;
