Stock Market Tracker
A modern, responsive stock market tracking application built with React and Node.js that allows users to view real-time stock data, visualize price trends, and compare multiple stocks.

Architecture & Tech Stack

Frontend
⦁	React 18 - Modern UI library with hooks
⦁	Chart.js & React-ChartJS-2 - Interactive data visualization
⦁	Axios - HTTP client for API requests
⦁	CSS Grid & Flexbox - Responsive layout design

Backend
⦁	Node.js & Express - RESTful API server
⦁	Mock Data Service - Simulated stock data with realistic fluctuations
⦁	CORS - Cross-origin resource sharing

System Architecture

 ─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External API  │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (Alpha Vantage│
│                 │    │                 │    │   or Mock Data) │
│   - Stock Input │    │   - API Routes  │    │                 │
│  - Price Display│    │   - Data Fetch  │    │                 │
│   - Chart Visual│    │   - Data Cache  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘

Data Flow

⦁	file:///C:/Users/Anisf/Downloads/data%20flow.drawio.html 

### Frontend Technologies
- **React 18** - Modern UI library with functional components and hooks
- **Chart.js & React-ChartJS-2** - Interactive data visualization for stock price charts
- **Axios** - HTTP client for seamless API communication
- **CSS Grid & Flexbox** - Responsive layout design with professional styling
- **Modern JavaScript (ES6+)** - Arrow functions, destructuring, async/await

### Backend Technologies
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, minimalist web framework for RESTful API
- **CORS** - Cross-origin resource sharing middleware
- **Mock Data Service** - Intelligent stock data simulation with realistic fluctuations

### Key Design Patterns
- **Component-Based Architecture** - Reusable React components
- **RESTful API Design** - Clean, predictable endpoints
- **Separation of Concerns** - Frontend/backend decoupling
- **Responsive Design** - Mobile-first approach

## 🚀 Setup and Run Instructions

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for cloning) - [Download here](https://git-scm.com/)

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/stock-market-tracker.git
cd stock-market-tracker

2. Install Dependencies

# Install root dependencies (for running both servers)
npm install

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Return to root directory
cd ..

3. Environment Setup (Optional)

# Backend environment (server/.env)
echo PORT=5000 > server/.env

# Frontend environment (client/.env)
echo REACT_APP_API_URL=http://localhost:5000/api > client/.env

4. Start the Application

Option A: Run Both Servers Together (Recommended)

# From root directory - starts both frontend and backend
npm run dev

Option B: Run Servers Separately

# Terminal 1 - Start Backend Server
cd server
npm run dev

# Terminal 2 - Start Frontend Development Server
cd client
npm start

5. Access the Application

Frontend Application: http://localhost:3000
Backend API: http://localhost:5000/api
API Test Endpoint: http://localhost:5000/api/stocks?ticker=AAPL

Quick Verification

Open http://localhost:3000 in your browser
Search for "AAPL" or click a popular stock button
Verify the stock chart and price history display
Switch to "Compare Stocks" tab and test with "AAPL,GOOGL,MSFT"

🎯 Features

Core Functionality

✅ Stock Search - Enter any ticker symbol to retrieve stock data
✅ Real-time Price Display - Current price, change percentage, and volume
✅ Interactive Charts - 7-day price history with Chart.js visualization
✅ Price History Table - Detailed day-by-day breakdown with change calculations
✅ Responsive Design - Optimized for desktop, tablet, and mobile devices

Advanced Features

✅ Multi-Stock Comparison - Compare up to 6 stocks side by side
✅ Performance Ranking - Automatic sorting by performance with winner highlighting
✅ Popular Stock Shortcuts - Quick access to major stocks by category
✅ Professional UI - Clean financial dashboard styling with hover effects
✅ Error Handling - Graceful error states and user feedback
✅ Loading States - Smooth user experience with loading indicators

Stock Categories

Tech Giants: AAPL, GOOGL, MSFT
Auto Stocks: TSLA, F, GM  
Banking: JPM, BAC, WFC

🌐 API Documentation

Endpoints

GET /api/stocks?ticker=SYMBOL

Fetch comprehensive data for a single stock ticker.


Parameters:


ticker (required) - Stock ticker symbol (e.g., AAPL, GOOGL)

Example Request:


curl "http://localhost:5000/api/stocks?ticker=AAPL"

Response:


{
  "ticker": "AAPL",
  "currentPrice": 175.50,
  "change": 2.30,
  "changePercent": 1.33,
  "volume": 1234567,
  "history": [
    {
      "date": "2024-01-15",
      "price": 173.20,
      "volume": 1100000
    }
    // ... 6 more days of historical data
  ]
}

GET /api/stocks/compare?tickers=AAPL,GOOGL,MSFT

Fetch comparison data for multiple stock tickers.


Parameters:


tickers (required) - Comma-separated list of ticker symbols

Response: Array of stock objects with same structure as single stock endpoint.


Data Features

Mock Data Generation - Realistic stock price simulation
7-Day Price History - Historical data with daily fluctuations
Volume Simulation - Realistic trading volume numbers
Price Change Calculations - Automatic calculation of daily changes

📱 Screenshots

Main Dashboard.png
Clean stock search interface with interactive price chart and floating stock information

Stock comparison.png
Side-by-side comparison table with performance ranking and visual indicators

Mobile Responsive
Fully responsive design optimized for mobile devices


🧪 Testing

Manual Testing Checklist

Single Stock Search

Test with valid tickers (AAPL, GOOGL, MSFT, TSLA)
Test with invalid/non-existent tickers
Verify popular stock buttons functionality

Stock Comparison
Compare 2-3 stocks simultaneously
Test quick comparison category buttons
Verify performance ranking and winner highlighting

User Interface
Test responsive design on different screen sizes
Verify loading states and error handling
Check hover effects and animations


API Testing

# Test single stock endpoint
curl "http://localhost:5000/api/stocks?ticker=AAPL"

# Test comparison endpoint  
curl "http://localhost:5000/api/stocks/compare?tickers=AAPL,GOOGL,MSFT"

# Test error handling
curl "http://localhost:5000/api/stocks?ticker=INVALID"

🚀 Deployment

Frontend Deployment (Netlify/Vercel)

# Build production version
cd client
npm run build

# Deploy the build folder to your hosting service
# Set environment variable: REACT_APP_API_URL=your-backend-url

Backend Deployment (Heroku/Railway)

# Deploy the server folder
# Set environment variable: PORT (automatically set by hosting service)
# Update frontend API URL to point to deployed backend

🛠️ Development

Project Structure

stock-market-tracker/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── services/       # API service functions
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Global styles and responsive design
│   │   └── index.js       # Application entry point
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Node.js Backend Application
│   ├── server.js          # Express server and API routes
│   └── package.json       # Backend dependencies
├── package.json           # Root scripts for development
└── README.md             # Project documentation

Code Quality Standards

ES6+ JavaScript with modern syntax and features
Functional Components with React hooks (useState, useEffect)
Responsive CSS with mobile-first design approach
Clean Architecture with separated concerns and modular design
Error Boundaries and comprehensive error handling
Consistent Code Style with proper indentation and naming conventions

🔮 Future Features

Short-term Enhancements (Next Sprint)

Real-time Data Integration: Replace mock data with live stock market APIs (Alpha Vantage, Finnhub, Yahoo Finance) to provide actual market data with real-time price updates, after-hours trading information, and integration with financial news feeds for comprehensive market analysis.


User Authentication & Personalization: Implement secure user registration and login system with persistent watchlists, allowing users to save favorite stocks, set custom price alerts with email/SMS notifications, and maintain personalized dashboards with preferred stock categories and viewing preferences.


Medium-term Features (Next Quarter)

Advanced Technical Analysis: Add comprehensive technical indicators including moving averages (SMA, EMA), RSI, MACD, Bollinger Bands, and candlestick charts with customizable timeframes (1D, 1W, 1M, 3M, 1Y, 5Y) and volume analysis tools for professional-grade market analysis.


Portfolio Management System: Enable users to input and track their actual stock holdings, calculate real-time portfolio performance, analyze gains/losses with tax implications, provide diversification analysis, and offer risk assessment metrics with rebalancing recommendations.


Long-term Vision (6-12 Months)

AI-Powered Investment Insights: Integrate machine learning models for price prediction analysis, sentiment analysis from news articles and social media, automated pattern recognition in stock charts, and personalized investment recommendations based on user behavior, risk tolerance, and market conditions.


Social Trading Platform: Develop community features including the ability to share and follow successful traders' watchlists, social sentiment indicators for stocks, collaborative investment discussions with real-time chat, leaderboards for top-performing community members, and copy-trading functionality for learning from experienced investors.


Mobile Application & Advanced Features: Create a React Native companion app with offline capabilities, biometric authentication, push notifications for price alerts and market news, paper trading simulation for practice, integration with brokerage APIs for actual trading, and advanced charting tools with drawing capabilities for technical analysis.

🙏 Acknowledgments

Chart.js for excellent charting capabilities
React Team for the amazing frontend framework
Express.js for the lightweight backend framework
Create React App for the initial project setup


Built with ❤️ for the Stock Market Tracker Engineering Challenge
