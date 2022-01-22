const path = "/opt/";
const { add_dynamo_entry } = require(`${path}dynamo`);

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    const entries = [];
    const new_ttl = new Date();
    const ttl = Math.round(new_ttl.setDate(new_ttl.getDate() + 14).valueOf() / 1000); 

    if (Array.isArray(event)) {
        try {
            event.forEach((e) => {
                entries.push(add_dynamo_entry({
                    ...e,
                    ttl,
                  }, process.env.TABLE))
            });

            await Promise.all(entries);
   
            console.log("RESULTS PUBLISHED")
            return "SUCCESS";
        } catch(err) {
            console.log(JSON.stringify(err));
            console.log("FAILED TO PUBLISH RESULTS")
            return "FAILED"
        }
    } else {
        console.log("CONFIGURATION ERROR")
        return "CONFIGURATION ERROR"
    }
       
};
