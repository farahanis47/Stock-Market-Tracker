import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchStockData = async (ticker) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stocks`, {
      params: { ticker }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const fetchComparisonData = async (tickers) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stocks/compare`, {
      params: { tickers }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comparison data:', error);
    throw error;
  }
};