const { local } = require("../configs/aws");
const AWS = require("aws-sdk");
AWS.config.update(local);
const dynamodb = new AWS.DynamoDB();

const CreateTable = () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeySchema: [{ AttributeName: "day", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "day", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };

  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    }
  });
};

const TableExist = () => {
  let tableExist = true;
  const params = {
    TableName: process.env.TABLE_NAME
  };
  dynamodb.describeTable(params, function(err, result) {
    if (err) {
      // no need to handle
    } else {
      tableExist = false;
    }
  });
  return tableExist;
};

module.exports = { CreateTable, TableExist };
