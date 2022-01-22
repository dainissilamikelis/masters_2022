const path = "/opt/";

const { query_dynamo } = require(`${path}dynamo`);
const { response_maker } = require(`${path}common`);
const { query_builder } = require(`${path}query`);

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    try {
        const query = JSON.parse(event.body);
        let allValues = true;
        let adjusted_items = [];
        const { PK, queries, limit, startKey } = query;

        let query_params = query_builder(PK, limit, allValues, queries, startKey);

   
        let searchMore = true;
        const items = [];
        while (searchMore) {
            const inserted = await query_dynamo({ ...query_params }, process.env.TABLE);
            const { Items, LastEvaluatedKey } = inserted;
            items.push(...Items);

            if (!LastEvaluatedKey) searchMore = false;
            query_params.ExclusiveStartKey = LastEvaluatedKey;
        }
        adjusted_items = items;

        return response_maker(adjusted_items, 200);
        
    } catch (err) {
        response_maker(err, 500);
    }
};
