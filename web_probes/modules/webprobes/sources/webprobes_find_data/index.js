const path =  "/opt/"

const { get_dynamo_entry  }= require(`${path}dynamo`);
const { response_maker } = require(`${path}common`);
 


const AWS = require("aws-sdk");
const s3 = new AWS.S3()

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    const body= JSON.parse(event.body)
    const { PK, SK } = body;
    try {
      const { Item } = await get_dynamo_entry(PK, SK, process.env.TABLE);
      const { Contents } = await s3.listObjectsV2({ 
          Bucket: process.env.BUCKET,
          Prefix: `${process.env.BUCKET}/${PK}/${SK}`
      }).promise();

      if (!Item) {
        return response_maker("Not found!", 404);
      }
      
  
      const images = Contents.map((c) =>  ({ url:`https://${process.env.BUCKET}.s3.eu-central-1.amazonaws.com/${c.Key}`, name: c.Key }));


      return response_maker({ ...Item, files: images }, 200)
    } catch(err) {
        return response_maker(err, 500)
    } 
};



