const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data service for demonstration
const mockStockData = {
  generatePriceHistory: (basePrice, days = 7) => {
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate price fluctuation (±5%)
      const change = (Math.random() - 0.5) * 0.1;
      currentPrice = currentPrice * (1 + change);
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(currentPrice.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    
    return data;
  },
  
  getStockInfo: (ticker) => {
    const basePrices = {
      'AAPL': 175.50,
      'GOOGL': 142.30,
      'MSFT': 378.85,
      'TSLA': 248.50,
      'AMZN': 145.75,
      'META': 325.20,
      'NVDA': 875.30
    };
    
    const basePrice = basePrices[ticker.toUpperCase()] || 100 + Math.random() * 200;
    const history = mockStockData.generatePriceHistory(basePrice);
    const currentPrice = history[history.length - 1].price;
    const previousPrice = history[history.length - 2].price;
    const change = currentPrice - previousPrice;
    const changePercent = (change / previousPrice) * 100;
    
    return {
      ticker: ticker.toUpperCase(),
      currentPrice,
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: history[history.length - 1].volume,
      history
    };
  }
};

// Routes
app.get('/api/stocks', (req, res) => {
  const { ticker } = req.query;
  
  if (!ticker) {
    return res.status(400).json({ error: 'Ticker symbol is required' });
  }
  
  try {
    const stockData = mockStockData.getStockInfo(ticker);
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.get('/api/stocks/compare', (req, res) => {
  const { tickers } = req.query;
  
  if (!tickers) {
    return res.status(400).json({ error: 'Ticker symbols are required' });
  }
  
  try {
    const tickerList = tickers.split(',').map(t => t.trim());
    const comparison = tickerList.map(ticker => mockStockData.getStockInfo(ticker));
    res.json(comparison);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comparison data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
