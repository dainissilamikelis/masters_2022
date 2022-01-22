terraform {
  required_version = ">= 1.0.1"
}

module "lambdas" {
  for_each                = local.lambda_definitions
  source                  = "../../common_modules/lambda_builder"
  file_name               = "${path.module}/sources/${each.value.path}"
  function_name           = "${var.PREFIX}-${each.key}"
  create_lambda_role      = true
  lambda_memory           = each.value.memory
  enviroment_variables    = each.value.ENV
  layers                  = var.LAYERS
}

output "policy_configuration" {
  value =  {
    dynamo_policy = {
      webprobes_find_data = module.lambdas["webprobes_find_data"].lambda_output.role,
      webprobes_get_data = module.lambdas["webprobes_get_data"].lambda_output.role,
      publish_results = module.lambdas["publish_results"].lambda_output.role,
      run_tests = module.lambdas["run_tests"].lambda_output.role
    }
    file_policy = {
      webprobes_find_data = module.lambdas["webprobes_find_data"].lambda_output.role,
      puppeteer_cases = module.lambdas["puppeteer_cases"].lambda_output.role
    }
    step_function_policy = {
      run_tests = module.lambdas["run_tests"].lambda_output.role
    }

  }
}

output "monitoring" {
  value = {
    E2E = module.lambdas["puppeteer_cases"].lambda_output.arn
    API = module.lambdas["api_cases"].lambda_output.arn
    FALLBACK = module.lambdas["publish_fallback_result"].lambda_output.arn
    RESULTS = module.lambdas["publish_results"].lambda_output.arn
  }
}

output "routes" {
  value = {
    "POST /webprobe"  = module.lambdas["webprobes_get_data"].lambda_output
    "POST /webprobe/entry"  = module.lambdas["webprobes_find_data"].lambda_output
    "GET /webprobe/run" = module.lambdas["run_tests"].lambda_output
  }
}



