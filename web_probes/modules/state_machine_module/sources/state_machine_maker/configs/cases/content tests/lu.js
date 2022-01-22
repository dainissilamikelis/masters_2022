const { defined_actions, path_config_maker, path_evaluator } = require("../helper")
exports.LU_TEST_CASE = {
  type: "LU_TEST_CASE",
  url: "https://www.lu.lv/",
  actions: [
    path_config_maker(
      defined_actions.goto,
      "https://www.lu.lv/",
      { describe: { waitUntil: "domcontentloaded" }},
    ),
    path_evaluator(
      defined_actions.evaluate_content,
      "#shoppingCartSubmitButton",
      "No Login button",
      {
          evaluateTo: "Next",
          evaluateBy: "textContent",
      }
    ),
    path_config_maker(
      defined_actions.screenshot,
      "end",
    ),
  ]
}

