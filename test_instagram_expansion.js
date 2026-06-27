const axios = require('axios');
require('dotenv').config();

const token = process.env.INSTA_ACCESS_TOKEN;
const mediaId = '18344745826171835';
const version = 'v21.0';
const host = 'https://graph.instagram.com';

async function runExpansionTest() {
  const fieldsOptions = [
    'id,comments_count,comments',
    'id,comments_count,comments{id,text,username,timestamp}',
    'id,comments_count,comments{id,text,username,timestamp,like_count}'
  ];

  for (const fields of fieldsOptions) {
    try {
      console.log(`\n--- Testing fields: ${fields} ---`);
      const res = await axios.get(`${host}/${version}/${mediaId}`, {
        params: {
          fields,
          access_token: token
        }
      });
      console.log('Status:', res.status);
      console.log('Data:', JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.log('Error:', err.response ? err.response.status : err.message);
      if (err.response) {
        console.log('Error Data:', JSON.stringify(err.response.data, null, 2));
      }
    }
  }
}

runExpansionTest();
