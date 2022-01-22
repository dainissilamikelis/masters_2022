const valueNormalized = (values) => {
    let normalizedValues = [];
    values.forEach(v => {
        if (v[0] === "0" && v.length === 5 && v.includes(":")) {
            v = v.substring(1, v.length);
        }
        normalizedValues.push(v);
    })
    
    
    return normalizedValues;
}

const attributeBuilder = (attribute, name, values) => {
   const attrs = [];
   values.forEach(val => {
       if (attribute === "includes") {
           attrs.push(`contains(${name}, ${val})`)
       } else {
           attrs.push(`${name} ${attribute} ${val}`)
       }
   });
   
   if (attrs.length > 1)  return `(${attrs.join(" or ").trim()})`
   return attrs[0].trim();
}


function query_builder(PK, limit, all, queries, startKey) {
    const ScanIndexForward = false;
    const ExpressionAttributeValues = {":PK": PK};
    const ExpressionAttributeNames = {"#PK": "PK"}
    const KeyConditions= [`#PK = :PK`];
    const FilterConditions = [];
    //#1 Create expression attribute values
   queries && queries.forEach((q) => {
         const id = q.id.toLowerCase().replace(/-/g, "");
         const key = `:${id}`
         const name = `#${id}`;
         const normalized = valueNormalized(q.values);
         const values = []
         if (normalized.length > 1) {
             normalized.forEach((v, idx) => {
                 ExpressionAttributeValues[`${key}${idx}`] = v
                 values.push(`${key}${idx}`)
             })
         } else {
             ExpressionAttributeValues[key] = normalized[0]
             values.push(key)
         }
         ExpressionAttributeNames[name] = q.id;
         FilterConditions.push(attributeBuilder(q.attribute, name, values));
    });

    const KeyConditionExpression = KeyConditions.join(" and ");
    const FilterExpression = FilterConditions.join(" and ")
    
    let Base = {
        KeyConditionExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues 
    };
    
    if (limit) { Base = {...Base, Limit: limit }};
    
    if (FilterExpression.length > 0) {
        return {
            ...Base,
            FilterExpression,
            ScanIndexForward,
        }
    }
    
    if (startKey) {
        Base = {...Base, ExclusiveStartKey: {
                ...startKey,
            }
        }
    }
    
    return {
        ...Base,
        ScanIndexForward,
    }
}


module.exports.query_builder = query_builder;