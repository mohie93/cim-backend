const { local } = require("../configs/aws");
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;
AWS.config.update(local);

const book = async options => {
  const { day, plateNumber, fullName, slot } = options;
  const record = await findById(day);

  if (Object.keys(record).length > 0) {
    return await update({
      slots: record.Item.slots,
      plateNumber,
      fullName,
      slot,
      day
    });
  } else {
    const slots = [{ plateNumber, fullName, slot }];
    return await create({ slots, day });
  }
};

const findById = async day => {
  var params = {
    TableName,
    Key: { day }
  };
  const result = await dynamoClient.get(params).promise();
  return result;
};

const all = async () => {
  const params = { TableName };
  const records = await dynamoClient.scan(params).promise();
  return records.Items;
};

const create = async options => {
  const { slots, day } = options;
  const params = {
    TableName,
    Item: {
      day: day,
      slots: slots
    }
  };
  return await dynamoClient.put(params).promise();
};

const update = async options => {
  const { slots, plateNumber, fullName, slot, day } = options;
  slots.push({ plateNumber, fullName, slot });
  const params = {
    TableName,
    Key: { day },
    UpdateExpression: "SET #slots = :slots",
    ExpressionAttributeNames: {
      "#slots": "slots"
    },
    ExpressionAttributeValues: {
      ":slots": slots
    }
  };
  return await dynamoClient.update(params).promise();
};

module.exports = { all, book, findById };
