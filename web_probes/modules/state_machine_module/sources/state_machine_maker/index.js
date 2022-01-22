const AWS = require("aws-sdk");

const stepfunctions = new AWS.StepFunctions({ region: "eu-central-1"});
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });
const { configs } = require("./configs");
const { parallel_state_template, branch_template, branch_template_api } = require("./helper");
const stateMachineArn = process.env.STATE_MACHINE;

exports.handler = async () => { 
  const branches_e2e = [];
  const branches_api = [];

  configs.forEach(({ type, url, vpc }) => {
      if (type.includes("-API")) {
        branches_api.push(branch_template_api(type, url, vpc))
      } else {
        branches_e2e.push(branch_template(type, url))
      }
  })

  const actions_flow = [];
  configs.forEach((k) => {
    const { type, actions, url } = k;
    actions.forEach((a, i) => {
      const action = {
        PK: "config",
        SK: `action-${type}-${i}`,  
        type,
        result: "CONFIG",
        action: a,
        url,
        sort: i
      }
      actions_flow.push(action);
    })
  })

  try {
    for(const flow of actions_flow) {
      await documentClient.put({
        TableName: process.env.TABLE,
        Item: flow
      }).promise()
    }
  
    const state_maker = JSON.stringify(parallel_state_template(branches_e2e, branches_api));
    var params = {
      stateMachineArn,
      definition: state_maker,
    };
    await stepfunctions.updateStateMachine(params).promise();
    console.log("UPDATE SUCCESSFUL")
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({message: "UPDATE SUCCESSFUL"}),
  };
  } catch(err) {
    console.log("FAILED TO GENERATE STATE MACHINE")
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({message: err.message }),
  };
  }
}
