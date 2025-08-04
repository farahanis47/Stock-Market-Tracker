const axios = require('axios');

const checkBackend = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/stocks?ticker=AAPL');
    console.log('✅ Backend is working!');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Backend is not working!');
    console.log('Error:', error.message);
  }
};

checkBackend();