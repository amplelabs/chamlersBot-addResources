'use strict';

// const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (
    typeof data.org_name !== 'string' || 
    typeof data.org_address !== 'string' ||
    typeof data.org_phone !== 'string' ||
    typeof data.www !== 'string' ||
    typeof data.email !== 'string' ||
    typeof data.service !== 'string' ||
    typeof data.desc !== 'string' ||
    typeof data.days !== 'string' ||
    typeof data.times !== 'string' ||
    typeof data.eligibility !== 'string' ||
    typeof data.notes !== 'string' ||
    typeof data.contact_name !== 'string' ||
    typeof data.contact_email !== 'string'
  ) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 
        'Content-Type': 'text/plain',
        // for CORS response header
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers value': 'x-api-key',
      },
      body: 'Couldn\'t create the new resource item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: data.id, // uuid.v1(),
      org_name: data.org_name, // name of the organization
      org_address: data.org_address,
      org_phone: data.org_phone,
      www: data.www,
      email: data.email,
      service: data.service, // Name of service
      desc: data.desc, // Service description
      days: data.days,
      times: data.times,
      eligibility: data.eligibility,
      notes: data.notes, // additional nots
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      timestamp: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 
          'Content-Type': 'text/plain',
          // for CORS response header
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers value': 'x-api-key',
        },
        body: 'Couldn\'t create the new resource item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        // for CORS response header
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers value': 'x-api-key',
      },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
