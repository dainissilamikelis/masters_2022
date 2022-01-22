const { defined_actions } = require("./helper");

const TEST_CASE_API = {
  base_url: 'https://api.fungenerators.com',
  access_url: null,
  secrets_key: null,
  cases:[
    {
      type: "BORED-API",
      url: "https://www.boredapi.com/api/activity",
      evaluation_type: defined_actions.find,
      request_type: "GET",
      expected_result: true,
      expected_value: "__ANY__",
    },
  ]
};

module.exports.TEST_CASE_API = TEST_CASE_API;