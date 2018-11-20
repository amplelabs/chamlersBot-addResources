const axios = require('axios');
const uuid = require('uuid');
require('dotenv').config({ path: '../.env' })

/*
const getUrl = process.env.GET_URL;
axios.get(getUrl)
  .then((resp) => {
    // resp.status === 200
    // resp.data !== [], null, or undefined
    console.log(resp);
  })
  .catch((err) => {
    console.error(err);
  })
*/


const postUrl = process.env.CREATE_URL;
const item = {
  id: uuid.v1(),
  org_name: 'test org', // name of the organization
  org_address: 'some test address',
  org_phone: '(123) 123-1234',
  www: 'www.amplelabs.co',
  email: 'test@amplelabs.co',
  service: 'meals', // Name of service
  desc: 'provide meals', // Service description
  days: 'Mon - Fri',
  times: '1:00pm - 3:0pm',
  eligibility: 'age 16 and up, mix gender',
  notes: 'na', // additional nots
  contact_name: 'joe smith',
  contact_email: 'joe@amplelabs.co'
};

axios.post(postUrl, item, {
  headers: {
    'x-api-key': process.env.API_KEY_VALUE
  }
})
  .then((resp) => {
    // resp.status === 200
    // resp.data === item
    console.log(resp);
  })
  .catch((err) => {
    console.error(err);
  })
