const AWS = require('aws-sdk');
const stepFunctions = new AWS.StepFunctions({ region: "eu-central-1" });

function describe_execution(executionArn) {
    return stepFunctions.describeExecution({ executionArn }).promise();
}
  
function start_execution(stateMachineArn, stateMachine) {
    return stepFunctions.startExecution({
        stateMachineArn,
        input: stateMachine
    }).promise();
}

module.exports.describe_execution = describe_execution;
module.exports.start_execution = start_execution;
