const { defined_actions, path_config_maker, path_type_maker, complex_action_maker, path_evaluator } = require("../helper")

exports.LU_LOGIN = {
  type: "LU-LOGIN",
  url: 'https://estudijas.lu.lv/login/index.php',
  actions: [
    path_config_maker(
      defined_actions.goto,
      'https://estudijas.lu.lv/login/index.php',
      { describe: { waitUntil: "networkidle2" }},
    ),
    path_config_maker(
      defined_actions.screenshot,
      "start", 
    ),
    path_type_maker(
      defined_actions.secure_type,
      "#username",
      "username",
    ),
    path_type_maker(
      defined_actions.secure_type,
      "#password",
      "password",
    ),
    path_config_maker(
      defined_actions.screenshot,
      "before-login",
    ),
    complex_action_maker(
      defined_actions.complex,
      [
        path_config_maker(
          defined_actions.click,
          "#loginbtn"
        ),
        path_config_maker(
          defined_actions.waitForNavigation,
          "domcontentloaded"
        )
      ]
    ),
    path_config_maker(
      defined_actions.screenshot,
      "after-login",
    ),
    path_evaluator(
      defined_actions.evaluate_url,
      "https://estudijas.lu.lv/my/",
      "After login navigating to url FAILED",
      {
          evaluateTo: true,
      }
    ),
  ]
}
