
// src/App.jsx
import './App.css'; 
// src/App.jsx
import React from 'react';
import { StockProvider } from './context/StockContext';
import StockForm from './components/StockForm';
import StockList from './components/StockList';


const App = () => (
  <StockProvider>
    <div className="app-container">
      <h1>Stock Portfolio</h1>
      <StockForm />
      <StockList />
      
    </div>
  </StockProvider>
);

export default App;

