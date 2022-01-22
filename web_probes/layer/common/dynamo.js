const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });

function scan_dynamo(params) {
    return documentClient.scan(params).promise();
}

function add_dynamo_entry(Item, TableName) {
    return documentClient
        .put({
            TableName,
            Item,
        })
        .promise();
}

function get_dynamo_entry(PK, SK, TableName) {
    return documentClient
        .get({
            TableName,
            Key: {
                PK,
                SK,
            },
        })
        .promise();
}

function delete_dynamo_entry(PK, SK, TableName) {
    return documentClient
        .delete({
            TableName,
            Key: {
                PK,
                SK,
            },
        })
        .promise();
}

function batch_write(group, TableName) {
    return documentClient
        .batchWrite({
            RequestItems: {
                [TableName]: group,
            },
        })
        .promise();
}

function query_dynamo(params, TableName) {
    return documentClient.query({ TableName, ...params }).promise();
}

function update_dynamo_admin_item_attribute(TableName, email, attribute, value) {
    return documentClient
        .update({
            TableName,
            Key: { PK: "UserLog", SK: email },
            UpdateExpression: "set #attribute = :new_value",
            ExpressionAttributeNames: {
                "#attribute": attribute,
            },
            ExpressionAttributeValues: {
                ":new_value": value,
            },
        })
        .promise();
}

function update_dynamo_maintenances(TableName, PK, SK) {
    return documentClient
        .update({
            TableName,
            Key: { PK, SK },
            ReturnValues: "ALL_NEW",
            UpdateExpression:
                "set #history = list_append(if_not_exists(#history, :empty_list), :arn)",
            ExpressionAttributeNames: {
                "#history": "history",
            },
            ExpressionAttributeValues: {
                ":arn": [
                    {
                        user,
                        date: new Date().toUTCString(),
                    },
                ],
                ":empty_list": [],
            },
        })
        .promise();
}

module.exports.add_dynamo_entry = add_dynamo_entry;
module.exports.get_dynamo_entry = get_dynamo_entry;
module.exports.delete_dynamo_entry = delete_dynamo_entry;
module.exports.batch_write = batch_write;
module.exports.update_dynamo_maintenances = update_dynamo_maintenances;
module.exports.query_dynamo = query_dynamo;
module.exports.scan_dynamo = scan_dynamo;
module.exports.update_dynamo_admin_item_attribute = update_dynamo_admin_item_attribute;
