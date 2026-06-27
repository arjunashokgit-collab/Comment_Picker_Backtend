const axios = require('axios');
require('dotenv').config();

const token = process.env.INSTA_ACCESS_TOKEN;
const host = 'https://graph.instagram.com';

async function debugToken() {
  try {
    console.log('Testing debug_token on graph.instagram.com...');
    const res = await axios.get(`${host}/debug_token`, {
      params: {
        input_token: token,
        access_token: token
      }
    });
    console.log('debug_token Response:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log('Error debug_token:', err.response ? err.response.data : err.message);
  }
}

debugToken();
