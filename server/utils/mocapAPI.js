const axios = require('axios');

const mocapAPI = axios.create({
  baseURL: 'https://mocap-studio-api.example.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.MOCAP_API_KEY}`,
  },
});

module.exports = mocapAPI;
