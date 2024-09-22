// src/utils/api.js
const API_KEY = 'WQF2ZMNQ2ACJ1GNX';

export const fetchStockPrice = async (symbol) => {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`);
    const data = await response.json();
    const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
    const lastPrice = data['Time Series (1min)'][lastRefreshed]['1. open'];
    return parseFloat(lastPrice);
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
};
