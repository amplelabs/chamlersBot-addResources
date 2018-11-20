'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
AWS.config.update({region:'us-east-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

//
//
//

exports.writeDB = (table, item) => {
  const params = {
    TableName: table,
    Item: item,
  };
  return new Promise((resolve, reject) => {
    dynamoDb.put(params, (error, result) => {
      if (error) reject(error);
      resolve(result);
    })
  })
}

exports.getDB = (table, params) => {
  return new Promise((resolve, reject) => {
    dynamoDb.get({
      TableName: table, ...params
    },
    (error, data) => {
      if (error) reject(error);
      resolve(data.Item);
    })
  })
}

exports.scanDB = (table, params) => {
  return new Promise((resolve, reject) => {
    dynamoDb.scan({
      TableName: table, ...params
    },
    (error, data) => {
      if (error) reject(error);
      resolve(data.Items);
    })
  })
}

exports.queryDB = (table, params) => {
  return new Promise((resolve, reject) => {
    dynamoDb.query({
      TableName: table, ...params
    },
    (error, data) => {
      if (error) reject(error);
      resolve(data.Items);
    })
  })
}

exports.deleteDB = (table, params) => {
  return new Promise((resolve, reject) => {
    dynamoDb.delete({
      TableName: table, ...params
    },
    (error, data) => {
      if (error) reject(error);
      resolve(data);
    })
  })
}

exports.updateDB = (table, params) => {
  return new Promise((resolve, reject) => {
    dynamoDb.update({
      TableName: table, ...params
    },
    (error, data) => {
      if (error) reject(error);
      resolve(data);
    })
  })
}