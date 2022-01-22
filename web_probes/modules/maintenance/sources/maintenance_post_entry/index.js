const path = "/opt/";
const { batch_write }= require(`${path}dynamo`);
const { parse_maintenance_entries, response_maker } = require(`${path}common`);

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    const tableEntries = [];
    try {
        const { form, user } = JSON.parse(event.body);
        const parsed = parse_maintenance_entries(form);
        parsed.forEach((e) => {
            let entry ={ 
                PutRequest: {
                    Item: {
                        ...e,
                        createdBy: user
                    }
                }
            }
            if (e["__mark__"] === true)  {
               entry = { DeleteRequest: {
                    Key: { PK: e.PK, SK: e.SK }
                  }
                }
            } 
            tableEntries.push(entry)
        });
        await batch_write(tableEntries, process.env.TABLE)
        return response_maker(tableEntries, 200);
    }
    catch (err) {
        return response_maker(err, 500);
    }
};
