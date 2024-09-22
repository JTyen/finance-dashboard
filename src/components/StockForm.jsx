// src/components/StockForm.jsx
import React, { useState, useContext } from 'react';
import { StockContext } from '../context/StockContext';
import { fetchStockPrice } from '../utils/api';
import './StockForm.css';

const StockForm = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const { addStock } = useContext(StockContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentPrice = await fetchStockPrice(symbol);

    if (currentPrice) {
      addStock({ symbol, quantity: parseInt(quantity, 10), price: parseFloat(price) });
      setSymbol('');
      setQuantity('');
      setPrice('');
    } else {
      alert('Invalid stock symbol');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Purchase Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default StockForm;
