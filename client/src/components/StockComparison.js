import React, { useState } from 'react';

const StockComparison = ({ onSearch, comparisonData, loading }) => {
  const [tickers, setTickers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tickers.trim()) {
      onSearch(tickers.trim().toUpperCase());
    }
  };

  return (
    <div className="stock-comparison">
      <form onSubmit={handleSubmit} className="comparison-search">
        <div className="search-container">
          <input
            type="text"
            value={tickers}
            onChange={(e) => setTickers(e.target.value)}
            placeholder="Enter tickers separated by commas (e.g., AAPL,GOOGL,MSFT)"
            className="search-input"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !tickers.trim()} className="search-button">
            {loading ? 'Loading...' : 'Compare'}
          </button>
        </div>
      </form>

      {comparisonData.length > 0 && (
        <div className="comparison-results">
          <h3>Stock Comparison</h3>
          <div className="comparison-table">
            <div className="table-header">
              <div>Ticker</div>
              <div>Price</div>
              <div>Change</div>
              <div>Change %</div>
              <div>Volume</div>
            </div>
            {comparisonData.map((stock, index) => (
              <div key={index} className="table-row">
                <div className="ticker-cell">{stock.ticker}</div>
                <div className="price-cell">${stock.currentPrice}</div>
                <div className={`change-cell ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}
                </div>
                <div className={`change-percent-cell ${stock.changePercent >= 0 ? 'positive' : 'negative'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                </div>
                <div className="volume-cell">{stock.volume.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockComparison;