
const defined_actions = {
    waitForSelector: "waitForSelector",
    waitForNavigation: "waitForNavigation",
    click: "click",
    type: "type",
    secure_type: "secure_type",
    complex: "complex",
    screenshot: "screenshot",
    evaluate: "evaluate",
    evaluate_url: "evaluate url",
    goto: "goto",
    evaluate_content: "evaluate content",
    waitFor: "waitFor",
    gatherCookies: "gather_cookies"
  }
  
  const path_config_maker = (action, action_description, config) => ({
      action,
      action_description,
      ...config,
    })
  
  const path_type_maker = (action, action_description, description, config) => ({
    action,
    action_description,
    description,
    ...config,
  })
  
  const complex_action_maker = (action, cases) => ({
    action,
    cases,
  })
  
  const path_evaluator = (action, action_description, description, config) => ({
    action,
    action_description,
    description,
    ...config,
  })
  

module.exports.path_config_maker = path_config_maker;
module.exports.path_evaluator = path_evaluator;
module.exports.path_type_maker = path_type_maker;
module.exports.complex_action_maker = complex_action_maker;
module.exports.defined_actions = defined_actions;