// src/components/StockList.jsx
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StockContext } from '../context/StockContext';
import { fetchStockPrice } from '../utils/api';
import './StockList.css'; // Import the CSS for styling

const StockList = () => {
  const { stocks } = useContext(StockContext); // Access stock data from context
  const [stockData, setStockData] = useState({}); // State to store fetched stock prices

  // Function to fetch stock prices
  const fetchPrices = useCallback(async () => {
    const data = {};
    for (const stock of stocks) {
      const currentPrice = await fetchStockPrice(stock.symbol);
      if (currentPrice) {
        data[stock.symbol] = currentPrice;
      }
    }
    setStockData(data); // Update state with fetched prices
  }, [stocks]);

  // Fetch prices when stocks change
  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  // Conditional rendering when no stocks are available
  if (stocks.length === 0) {
    return <p className="no-stocks">No stocks available</p>;
  }

  return (
    <div className="stock-list">
      <ul>
        {stocks.map((stock) => {
          const currentPrice = stockData[stock.symbol]; // Get current price from state
          if (!currentPrice) return null; // Skip if price is not available

          // Calculate profit/loss
          const profitLoss = (currentPrice - stock.price) * stock.quantity;
          const profitLossClass = profitLoss >= 0 ? 'profit' : 'loss'; // Determine class based on profit/loss

          return (
            <li key={stock.symbol} className="stock-card">
              <div className="stock-header">
                <h2 className="stock-symbol">{stock.symbol}</h2>
              </div>
              <div className="stock-body">
                <div className="stock-info">
                  <span className="label">Quantity:</span> {stock.quantity}
                </div>
                <div className="stock-info">
                  <span className="label">Purchase Price:</span> ${stock.price.toFixed(2)}
                </div>
                <div className="stock-info">
                  <span className="label">Current Price:</span> ${currentPrice.toFixed(2)}
                </div>
                <div className={`stock-profit-loss ${profitLossClass}`}>
                  <span className="label">Profit/Loss:</span> ${profitLoss.toFixed(2)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StockList;
