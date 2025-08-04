import React, { useState } from 'react';

const StockSearch = ({ onSearch, loading }) => {
  const [ticker, setTicker] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim()) {
      onSearch(ticker.trim().toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stock-search">
      <div className="search-container">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker (e.g., AAPL)"
          className="search-input"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !ticker.trim()} className="search-button">
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      <div className="popular-stocks">
        <span>Popular: </span>
        {['AAPL', 'GOOGL', 'MSFT', 'TSLA'].map(stock => (
          <button
            key={stock}
            type="button"
            onClick={() => onSearch(stock)}
            className="popular-stock-btn"
            disabled={loading}
          >
            {stock}
          </button>
        ))}
      </div>
    </form>
  );
};

export default StockSearch;