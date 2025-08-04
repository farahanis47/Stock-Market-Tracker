import React from 'react';

const StockDisplay = ({ stockData }) => {
  const { ticker, currentPrice, change, changePercent, volume } = stockData;
  const isPositive = change >= 0;

  return (
    <div className="stock-display">
      <div className="stock-header">
        <h2>{ticker}</h2>
        <div className="stock-price">
          <span className="current-price">${currentPrice}</span>
          <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{change} ({isPositive ? '+' : ''}{changePercent}%)
          </span>
        </div>
      </div>
      
      <div className="stock-details">
        <div className="detail-item">
          <span className="label">Volume:</span>
          <span className="value">{volume.toLocaleString()}</span>
        </div>
        <div className="detail-item">
          <span className="label">Change:</span>
          <span className={`value ${isPositive ? 'positive' : 'negative'}`}>
            ${Math.abs(change)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockDisplay;