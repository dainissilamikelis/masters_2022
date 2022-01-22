const path =  "/opt";

const { resolve_maker } = require(`${path}/common`);
const { GET_API_REQUEST } = require(`${path}/api`);

const { performance } = require('perf_hooks');

exports.handler = async (event) => {
  console.log(JSON.stringify(event))
  const start_time = new Date();
  const { type, url, actions } = event;
  const error_message = []
  const evaluations = [];
  const PK = type;
  const SK = `${type}-${start_time.toISOString()}`
  try {
    const race1 = new Promise((resolve) => { 
      const handler = async () => {
        const { url, expected_value } = actions[0];
        try {
          let badCase;
          const start = performance.now();
          const resp = await GET_API_REQUEST(url);
          const end = performance.now();

          const { data, status } = resp;
          if (expected_value !== "__ANY__") {
            bad_case= !JSON.stringify(data).includes(expected_value);
          } else {
            bad_case = status === 200;
          }
          if (badCase) {
            error_message.push("RESULT NOT FOUND")
            evaluations.push({ action: {
                action: "FIND",
                description: `Find expected value ${expected_value}`,
                action_description: expected_value,
                evaluateTo: true,
            }, url: JSON.stringify(data), success: badCase })
          } 
          if (status !== 200)  error_message.push(`STATUS CODE ${status}`)
        
          const loadTime = end - start;
          const normalized = Math.round(loadTime);

          const result = badCase ? "NOT FOUND" : "FOUND";
          const resolve_value = resolve_maker(start_time, true, url, type, normalized, result, status)
          resolve(resolve_value)

        } catch (err) {
          const { response } = err;
          const status = response ? response.status : 500;
          const err_data = response.data || err.message;
          error_message.push(err_data);
          const error_value = resolve_maker(start_time, false, url, type, 0, "ERROR", status)
          resolve(error_value)
        }
      }
      handler();
    })
    let timeout;
    const race2 = new Promise((resolve) => {
      timeout = setTimeout(() => { 
        const timeout_value = resolve_maker(start_time, false, url, type, 40000, "TIMEOUT", 408)
        resolve(timeout_value)
    }, 29000)
  })

    const resp = await Promise.race([race1, race2]);
    clearTimeout(timeout);
  
    const return_value = {
      ...resp, 
      PK, 
      SK, 
      error_message, 
      evaluations
    };
    console.log(`############################# ${resp.result} ####################################`)
    return return_value;
  } catch(err){
    console.log(`#############################  ERROR ####################################`)
    return {
      start_time,
      testName: type,
      passed: false,
      url,
      latency: 0,
      result: "SERVER ERROR",
      status: 500,
      error_message: err.message, 
      evaluations,
    }
  }
}

