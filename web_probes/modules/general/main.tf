terraform {
  required_version = ">= 1.0.1"
}

module "lambdas" {
  for_each                = local.lambda_definitions
  source                  = "../../common_modules/lambda_builder"
  file_name               = "${path.module}/sources/${each.value.path}"
  function_name           = "${var.PREFIX}-${each.key}"
  create_lambda_role      = true
  enviroment_variables    = each.value.ENV
  layers                  = var.LAYERS
}

output "policy_configuration" {
  value =  {
    dynamo_policy = {
      query = module.lambdas["query"].lambda_output.role,
    }
  }
}

output "routes" {
  value = {
    "POST /query"       = module.lambdas["query"].lambda_output
  }
}
