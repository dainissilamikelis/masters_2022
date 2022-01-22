/* eslint-disable no-case-declarations */
const path = process.env.DEV === "true" ? "../../layer/common" : "/opt";
const puppeteer_path = process.env.DEV === "true" ? "../../layer/node_modules" : "/opt/node_modules";

const chromium = require(`${puppeteer_path}/chrome-aws-lambda`);

const { harFromMessages } = require(`${puppeteer_path}/chrome-har`);
const { resolve_maker, resolve_puppeteer_maker } = require(`${path}/common`);

const { observe, defaultViewport, defined_actions, HarData, } = require("./puppeteer-config");
const { basic_actions, evaluate_content, evaluate_url, handle_bad_cases } = require("./helper");

exports.handler = async(event) => {

  console.log(JSON.stringify(event));
  const { type, url } = event;
  const start_time = new Date();
  const PK = type;
  const SK = `${type}-${start_time.toISOString()}`
  const events = [];
  const evaluations = [];
  const actions_status = [];
  const error_message = []
  const various_info = [];
  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();

    await client.send('Page.enable');
    await client.send('Network.enable');

    observe.forEach(method => {
      client.on(method, params => {
        events.push({ method, params });
      });
    });

    await page.setViewport(defaultViewport);

    const race1 = new Promise((resolve) => {
      const handler  = async (event) => {
        const { actions } = event;
        try {
          let index = 0;
          for (const action_data of actions) {
            const { action, cases } = action_data;
            switch (action) {
              case defined_actions.complex:
                const complex_promises = [];
                let inner_index = 0;
                for (const case_data of cases) {
                  complex_promises.push(basic_actions(case_data, page, type, index, inner_index));
                  inner_index++;
                }
                await Promise.all(complex_promises);
                break;
              case (defined_actions.evaluate_url):
                evaluations.push({action: action_data, success:evaluate_url(action_data, page), url: page.url()})
                break;
              case (defined_actions.evaluate_content):
                const resp = await evaluate_content(action_data, page)
                evaluations.push({ action: action_data, success: resp })
                break;
              default:
                const resp_1 = await Promise.resolve(basic_actions(action_data, page, type, index));
                if (resp_1 && resp_1["_status"] && resp_1["_url"] ) {
                  const { _status, _url } = resp_1;
                  actions_status.push({ url: _url, status: _status });
                }
                break;
            }
            index++;
          }
          const resolve_value = resolve_maker(start_time, true, url, type, 0, "FOUND", 200)
          resolve(resolve_value)
            
          } catch (err) {
            const { response } = err;
            const status = response ? response.status : 500;
            error_message.push(err.message);
            const error_value = resolve_maker(start_time, false, url, type, 0, "ERROR", status)
            resolve(error_value)
          }
      }
      handler(event)
    })
    
    let timeout;
    const race2 = new Promise((resolve) =>  {
      timeout = setTimeout(() => { 
      const timeout_value = resolve_maker(start_time, false, url, type, 60000, "TIMEOUT", 408)
      resolve(timeout_value)
    }, 60000)
  })

    const resp = await Promise.race([race1, race2]);
    clearTimeout(timeout);
    await browser.close();
    
    
    
    const badCase = await handle_bad_cases(evaluations, error_message, PK, SK);
    const har = harFromMessages(events);
    various_info.push(har);
    const { loadTime } = HarData(har);
    const final_resolve_value = resolve_puppeteer_maker(resp, badCase, loadTime)
    
      const return_value = {
        ...final_resolve_value, 
        PK, 
        SK, 
        error_message, 
        evaluations
      };
      console.log(`############################# ${return_value.result} ####################################`)
      return return_value;
  } catch(err){
    console.log(`#############################  ERROR ####################################`)
    return {
      start_time,
      testName: type,
      passed: false,
      url,
      latency: 0,
      result: "SERVER ERROR",
      additional_info: various_info,
      status: 500,
      error_message: err.message, 
      evaluations,
    }
  }   
}
