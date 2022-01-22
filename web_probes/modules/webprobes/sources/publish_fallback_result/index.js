exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    const { type, url } = event;
    const start_time = new Date().toISOString();
    const entry = {
        "start_time": new Date().toISOString(),
        "testName": type,
        "passed": false,
        "url":  url,
        "latency": 0,
        "result": "STEP FUNCTION SERVER ERROR",
        "status": 500,
        "PK": type,
        "SK": `${type}-${start_time}`,
        "error_message": [],
        "evaluations": []
    }
    return entry;
} 
  

