const axios = require('axios');

async function DFAPI(url) {
  try {
    const response = await axios.get(url);
    return response.data; 
  } catch (error) {
    console.error('Error:', error.message);
    throw error; 
  }
}

module.exports = DFAPI;
