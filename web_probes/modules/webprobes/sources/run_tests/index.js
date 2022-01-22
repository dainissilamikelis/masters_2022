const AWS = require("aws-sdk");

const stepfunctions = new AWS.StepFunctions({ region: "eu-central-1"});
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });

const stateMachineArn = process.env.STATE_MACHINE;

exports.handler = async () => { 
  const { Items } = await documentClient.query({
    TableName: process.env.TABLE,
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': 'config',
    },
  }).promise();
  
  const input_data = {};
  Items.forEach((d) => {
    const { type, action, url, sort } = d;
    if (input_data[type]) input_data[type].actions.push({ ...action, sort });
    else input_data[type] = { type, actions:[{ ...action, sort }], url};
  });

  const sorted = {};
  Object.keys(input_data).forEach((k) => {
    const value = input_data[k].actions.sort((a,b) => a.sort - b.sort);
    sorted[k] = { ...input_data[k], actions: value}
  })

  const input = JSON.stringify(sorted);
 
  const input_params = {
    stateMachineArn,
    input,
  }

  try {
    await stepfunctions.startExecution(input_params).promise();
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({message: "RUN SUCCESSFUL"}),
    };
  } catch(err) {
    console.log("FAILED TO GENERATE STATE MACHINE")
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({message: err.message })
  };
}
}
