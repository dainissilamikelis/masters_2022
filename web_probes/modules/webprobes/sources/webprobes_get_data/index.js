const path = "/opt/";

const { query_dynamo } = require(`${path}dynamo`);
const { response_maker } = require(`${path}common`);

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    const { body } = event;
    const { error, limit } = JSON.parse(body);
    const items = [];
    try {
        const ExpressionAttributeValues = { ":result": error };
        const ExpressionAttributeNames = { "#result": "result" };
        const KeyConditions = [`#result = :result`];

        const KeyConditionExpression = KeyConditions.join(" and ");

        let Base = {
            IndexName: "result-SK-index",
            Limit: limit || 10,
            KeyConditionExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues,
            ScanIndexForward: true,
        };
        if (!limit) {
            let searchMore = true;
            while (searchMore) {
                const inserted = await query_dynamo({ ...Base }, process.env.TABLE);
                const { Items, LastEvaluatedKey } = inserted;
                items.push(...Items);

                if (!LastEvaluatedKey) {
                    searchMore = false;
                } else {
                    Base = {
                        ...Base,
                        ExclusiveStartKey: LastEvaluatedKey,
                    };
                }
            }
        } else {
            const inserted = await query_dynamo({ ...Base }, process.env.TABLE);
            const { Items } = inserted;
            items.push(...Items);
        }

        return response_maker(items, 200);
    } catch (err) {
        response_maker(err, 500);
    }
};
