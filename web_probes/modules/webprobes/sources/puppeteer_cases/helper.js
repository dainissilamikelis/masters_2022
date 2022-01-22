/* eslint-disable no-case-declarations */

const AWS_SDK_PATH = process.env.DEV === "true" ? "../../layer/common/node_modules/aws-sdk" : "aws-sdk";
const AWS = require(AWS_SDK_PATH);

const s3 = new AWS.S3();
const fs = require("fs");

const { defined_actions, data_src, screen_shot_src  } = require("./puppeteer-config");

const handle_actions = async (action_data, page, type, index, inner_index) => {
    const { action, action_description, describe, description } = action_data;
    const id = inner_index ? `${index}_${inner_index}` : `${index}`;
    switch(action) {
      case defined_actions.waitForSelector:
        return page.waitForSelector(action_description, describe);
      case defined_actions.waitForNavigation:
        return page.waitForNavigation({ waitUntil: action_description });
      case defined_actions.click:
        return page.click(action_description);
      case defined_actions.type:
        return page.type(action_description, description)
      case defined_actions.secure_type:
        const secret_data_exposed = JSON.parse(process.env.SECRETS);
        const data_value = secret_data_exposed[action_description];
        return page.type(action_description, data_value)
      case defined_actions.screenshot:
        return page.screenshot({ path: `${data_src}/${id}-${action_description}.png` })
      case defined_actions.goto:
        return page.goto(action_description, describe)
    }
  }
    
  const handle_evaluate_content = async (action_data, page) => {
    const { action_description, evaluateTo } = action_data;
    const options_resp = await page.$$eval(action_description, async (options) => {
      const option = options.map((option) => option.textContent || option.value);
      return new Promise((resolve, reject) => {
        try {
          resolve(option)
        } catch (err) {
          console.log(err);
          reject(err.toString());
        }
      });
    });
    const clean_options = [];
    options_resp.forEach((o) =>{
      const newO =  o.replace(new RegExp(/\t/,"g"), " ").replace(new RegExp(/\n/, "g"), " ").trim();
      clean_options.push(newO.toLowerCase())
    })
    if (evaluateTo === "__ANY_VALUE__") {
      return options_resp && Array.isArray(options_resp) && clean_options.length > 0;
    }
    return options_resp && Array.isArray(options_resp) && clean_options.includes(evaluateTo.toLowerCase());
  }
    
const handle_evaluate_url = (action_data, page) => {
    const { action_description, evaluateTo } = action_data;
    const current_url = page.url();
    const evaluation = current_url === action_description;
    return evaluation === evaluateTo;
}

const handle_bad_cases = async (evaluations, error_message, PK, SK) => {
  const badCase = evaluations.some((e) => e.success === false ) ? true : false;
  const screen_shot_data = fs.readdirSync(data_src);
  if (badCase) {
    const badCases = evaluations.filter((b) => b.success === false);
    badCases.forEach((b) => {
      error_message.push(b.action.description)
    });
    for(const screen_shot of screen_shot_data) {
      if (screen_shot.includes(".png")) {
        const buffer = fs.readFileSync(`${data_src}/${screen_shot}`);
          await s3.putObject({
            Body: buffer,
            Bucket: screen_shot_src,
            Key: `${screen_shot_src}/${PK}/${SK}/${screen_shot}`,
          }).promise();
      }
      }
      screen_shot_data.forEach((ss) =>  {
        if (ss.includes(".png")) fs.unlinkSync(`${data_src}/${ss}`)
      });
    } else {
      screen_shot_data.forEach((ss) =>  {
        if (ss.includes(".png")) fs.unlinkSync(`${data_src}/${ss}`)
      });
    }

  return badCase;
}

module.exports.basic_actions = handle_actions;
module.exports.evaluate_content = handle_evaluate_content;
module.exports.evaluate_url = handle_evaluate_url;
module.exports.handle_bad_cases = handle_bad_cases;