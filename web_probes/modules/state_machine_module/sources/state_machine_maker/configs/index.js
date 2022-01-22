const { API_CASES }= require("./cases/api");
const { LOGIN_CASES }= require("./cases/logins");
const { CONTENT_CASES } = require("./cases/content tests");

const api_cases_to_isolated_cases = () => {
    const isoleted_cases = [];
    API_CASES.forEach((ac) => {
        const { access_url, base_url, secrets_key, cases, VPC } = ac;
       cases.forEach((c) =>{
        isoleted_cases.push({
            type: c.type,
            url: c.url,
            vpc: VPC || false,
            actions: [
                {
                    access_url,
                    base_url,
                    secrets_key,
                    ...c,
                }
            ]
        })
       })
    })
    return isoleted_cases;
}

const configs = [
    ...LOGIN_CASES,
    ...CONTENT_CASES,
    ...api_cases_to_isolated_cases()
]

module.exports.configs = configs;
  