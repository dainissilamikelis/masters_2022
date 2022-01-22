// resource => enviroment variables
const branch_template_e2e = (case_id, url) => {
    const resource = process.env.E2E;
    return {
        "StartAt": `Run test ${case_id}`,
        "States": {
        [`Run test ${case_id}`]: {
            "Type": "Task",
            "InputPath": `$.${case_id}`,
            "Resource": resource,
            "TimeoutSeconds": 60,
            "Catch": [
              {
                "ErrorEquals": ["States.ALL"],
                "Next": `Fallback ${case_id}`
              }
            ],
            "End": true,
        },
        [`Fallback ${case_id}`]: {
          "Type": "Task",
          "InputPath": "$",
          "Parameters":  {
            "type": case_id,
            "url": url
          },
          "Resource": process.env.FALLBACK,
          "End": true,
        },
      },
    }
};

const branch_template_api = (case_id, url, vpc) => {
    let resource =  process.env.API;
    if (vpc) resource = process.env.API_VPC;
    return {
        "StartAt": `Run test ${case_id}`,
        "States": {
        [`Run test ${case_id}`]: {
            "Type": "Task",
            "InputPath": `$.${case_id}`,
            "Resource": resource,
            "TimeoutSeconds": 30,
            "Catch": [
              {
                "ErrorEquals": ["States.ALL"],
                "Next": `Fallback ${case_id}`
              }
            ],
            "End": true,
          },
          [`Fallback ${case_id}`]: {
            "Type": "Task",
            "InputPath": "$",
            "Parameters":  {
              "type": case_id,
              "url": url
            },
            "Resource": process.env.FALLBACK,
            "End": true,
          },
        },
       
    }
};

const parallel_state_template = (branches, branches_api) => ({
  "Comment": "Monitoring cases",
  "StartAt": "Monitor",
  "States": {
    "Monitor": {
      "Type": "Parallel",
      "Branches": [...branches, ...branches_api],
      "Next": "Publish results",
    },
    "Publish results": {
      "Type": "Task",
      "InputPath": "$",
      "Resource": process.env.RESULTS,
      "End": true,
    },
  }
});

module.exports.branch_template = branch_template_e2e;
module.exports.branch_template_api = branch_template_api;
module.exports.parallel_state_template = parallel_state_template;