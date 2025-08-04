import React, { useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Price History Table Component
const PriceHistoryTable = ({ stockData }) => {
  if (!stockData || !stockData.history) return null;

  const calculateDayChange = (currentPrice, previousPrice) => {
    if (!previousPrice) return { change: 0, changePercent: 0 };
    const change = currentPrice - previousPrice;
    const changePercent = (change / previousPrice) * 100;
    return {
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2))
    };
  };

  return (
    <div className="price-history-table">
      <h3>📈 7-Day Price History</h3>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
              <th>Change</th>
              <th>Change %</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockData.history.map((day, index) => {
              const previousDay = index > 0 ? stockData.history[index - 1] : null;
              const dayChange = calculateDayChange(day.price, previousDay?.price);
              
              return (
                <tr key={day.date}>
                  <td className="date-cell">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="price-cell">${day.price}</td>
                  <td className={`change-cell ${dayChange.change >= 0 ? 'positive' : 'negative'}`}>
                    {index === 0 ? '-' : `${dayChange.change >= 0 ? '+' : ''}$${Math.abs(dayChange.change)}`}
                  </td>
                  <td className={`change-percent-cell ${dayChange.changePercent >= 0 ? 'positive' : 'negative'}`}>
                    {index === 0 ? '-' : `${dayChange.changePercent >= 0 ? '+' : ''}${dayChange.changePercent}%`}
                  </td>
                  <td className="volume-cell">{day.volume.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Stock Comparison Component
const StockComparison = ({ comparisonData, onSearch, loading }) => {
  const [tickers, setTickers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tickers.trim()) {
      onSearch(tickers.trim().toUpperCase());
    }
  };

  return (
    <div className="stock-comparison">
      <div className="comparison-search-card">
        <h3>📊 Compare Multiple Stocks</h3>
        <form onSubmit={handleSubmit} className="comparison-form">
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
          
          <div className="popular-comparisons">
            <span className="popular-label">Quick Compare:</span>
            <div className="popular-buttons">
              <button
                type="button"
                onClick={() => onSearch('AAPL,GOOGL,MSFT')}
                className="popular-comparison-btn"
                disabled={loading}
              >
                Tech 
              </button>
              <button
                type="button"
                onClick={() => onSearch('TSLA,Ford,GM')}
                className="popular-comparison-btn"
                disabled={loading}
              >
                Automotive
              </button>
              <button
                type="button"
                onClick={() => onSearch('JPM,BAC,WFC')}
                className="popular-comparison-btn"
                disabled={loading}
              >
                Banks
              </button>
            </div>
          </div>
        </form>
      </div>

      {comparisonData.length > 0 && (
        <div className="comparison-results">
          <div className="comparison-table">
            <div className="table-header">
              <div>Ticker</div>
              <div>Current Price</div>
              <div>Change ($)</div>
              <div>Change (%)</div>
              <div>Volume</div>
              <div>Performance</div>
            </div>
            {comparisonData
              .sort((a, b) => b.changePercent - a.changePercent)
              .map((stock, index) => (
                <div key={stock.ticker} className="table-row">
                  <div className="ticker-cell">
                    <strong>{stock.ticker}</strong>
                    {index === 0 && <span className="best-performer">🏆</span>}
                  </div>
                  <div className="price-cell">${stock.currentPrice}</div>
                  <div className={`change-cell ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                    {stock.change >= 0 ? '+' : ''}${stock.change}
                  </div>
                  <div className={`change-percent-cell ${stock.changePercent >= 0 ? 'positive' : 'negative'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </div>
                  <div className="volume-cell">{stock.volume.toLocaleString()}</div>
                  <div className="performance-cell">
                    <div className={`performance-bar ${stock.changePercent >= 0 ? 'positive' : 'negative'}`}>
                      <div 
                        className="performance-fill"
                        style={{
                          width: `${Math.min(Math.abs(stock.changePercent) * 10, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Multi-Stock Chart Component
const MultiStockChart = ({ comparisonData }) => {
  if (!comparisonData || comparisonData.length === 0) return null;

  const colors = [
    'rgb(75, 192, 192)',
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)'
  ];

  const chartData = {
    labels: comparisonData[0].history.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: comparisonData.map((stock, index) => ({
      label: stock.ticker,
      data: stock.history.map(item => item.price),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length].replace('rgb', 'rgba').replace(')', ', 0.2)'),
      tension: 0.1,
    }))
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Price Comparison - 7 Days',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        }
      }
    }
  };

  return (
    <div className="multi-stock-chart">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

// NEW: Clean Stock Info Overlay Component
const StockInfoOverlay = ({ stockData }) => {
  if (!stockData) return null;

  return (
    <div className="stock-info-overlay">
      <div className="stock-ticker">{stockData.ticker}</div>
      <div className="stock-price">${stockData.currentPrice}</div>
      <div className={`stock-change ${stockData.changePercent >= 0 ? 'positive' : 'negative'}`}>
        {stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%
      </div>
      <div className="stock-volume">Vol: {stockData.volume.toLocaleString()}</div>
    </div>
  );
};

// Main App Component
function App() {
  const [stockData, setStockData] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('single');

  const fetchStockData = async (symbol) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:5000/api/stocks?ticker=${symbol}`);
      setStockData(response.data);
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComparisonData = async (tickers) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:5000/api/stocks/compare?tickers=${tickers}`);
      setComparisonData(response.data);
    } catch (err) {
      setError('Failed to fetch comparison data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim()) {
      fetchStockData(ticker.trim().toUpperCase());
    }
  };

  const chartData = stockData ? {
    labels: stockData.history.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: `${stockData.ticker} Price`,
        data: stockData.history.map(item => item.price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend since we have overlay
      },
      title: {
        display: false, // Hide title since we have overlay
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          },
          color: '#6c757d',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          color: '#6c757d',
          font: {
            size: 11
          }
        }
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📈 Stock Market Tracker</h1>
        <div className="tab-navigation">
          <button 
            className={activeTab === 'single' ? 'active' : ''}
            onClick={() => setActiveTab('single')}
          >
            Single Stock
          </button>
          <button 
            className={activeTab === 'compare' ? 'active' : ''}
            onClick={() => setActiveTab('compare')}
          >
            Compare Stocks
          </button>
        </div>
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}

        {activeTab === 'single' ? (
          <div className="single-stock-view">
            {/* Search Card */}
            <div className="search-card">
              <h3>🔍 Search Stock</h3>
              <form onSubmit={handleSubmit} className="stock-search-form">
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
                
                <div className="popular-stocks-section">
                  <span className="popular-label">Popular Stocks:</span>
                  <div className="popular-stocks-grid">
                    {['AAPL', 'GOOGL', 'BAC', 'TSLA', 'AMZN'].map(stock => (
                      <button
                        key={stock}
                        onClick={() => fetchStockData(stock)}
                        className="popular-stock-btn"
                        disabled={loading}
                      >
                        {stock}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {stockData && (
              <div className="stock-results">
                {/* NEW: Stock Info Above Chart */}
                <div className="stock-info-header">
                  <div className="stock-ticker">{stockData.ticker}</div>
                  <div className="stock-price">${stockData.currentPrice}</div>
                  <div className={`stock-change ${stockData.changePercent >= 0 ? 'positive' : 'negative'}`}>
                    {stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%
                  </div>
                  <div className="stock-volume">Vol: {stockData.volume.toLocaleString()}</div>
                </div>

                {/* Stock Chart */}
                <div className="stock-chart-container">
                  {chartData && <Line data={chartData} options={chartOptions} />}
                </div>

                {/* Price History Table */}
                <PriceHistoryTable stockData={stockData} />
              </div>
            )}
          </div>
        ) : (
          <div className="comparison-view">
            <StockComparison 
              comparisonData={comparisonData}
              onSearch={fetchComparisonData}
              loading={loading}
            />
            
            {comparisonData.length > 0 && (
              <div className="comparison-chart-section">
                <div className="multi-chart-container">
                  <h3>📊 Price Comparison Chart</h3>
                  <MultiStockChart comparisonData={comparisonData} />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;