provider "aws" {
  region = var.AWS_REGION
  access_key = var.ACCESS_KEY
  secret_key = var.SECRET_KEY
}
data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

module "general_project" {
  source = "./modules/general"
  PREFIX = local.PREFIX
  LAYERS = tolist([aws_lambda_layer_version.common_layer.arn])
  ENV = {
    GENERAL = {
      TABLE             = aws_dynamodb_table.core_table.name
    },
  }
}


module "maintenance_project" {
  source = "./modules/maintenance"
  PREFIX = local.PREFIX
  LAYERS = tolist([aws_lambda_layer_version.common_layer.arn])
  ENV = {
    GENERAL = {
      TABLE             = aws_dynamodb_table.core_table.name
    },
  }
}

module "webprobes_project" {
  source = "./modules/webprobes"
  PREFIX = local.PREFIX
  LAYERS = tolist([aws_lambda_layer_version.common_layer.arn, aws_lambda_layer_version.main_layer.arn])
  ENV = {
    GENERAL = {
      TABLE           = aws_dynamodb_table.core_table.name
      SECRETS         = jsonencode(var.SECRETS)
      BUCKET          = aws_s3_bucket.web-probe-bucket.bucket
      STATE_MACHINE   = aws_sfn_state_machine.sfn_state_machine.arn,
    },
  }
}

module "state_machine_project" {
    source = "./modules/state_machine_module"
    PREFIX = local.PREFIX
    LAYERS = tolist([aws_lambda_layer_version.common_layer.arn])
    ENV = {
      GENERAL = {
        TABLE          = aws_dynamodb_table.core_table.name,
        STATE_MACHINE   = aws_sfn_state_machine.sfn_state_machine.arn,
        E2E            = module.webprobes_project.monitoring["E2E"],
        API            = module.webprobes_project.monitoring["API"],
        RESULTS        = module.webprobes_project.monitoring["RESULTS"],
        FALLBACK       = module.webprobes_project.monitoring["FALLBACK"]
      },
    }
}


module "routes" {
  for_each = merge(
    module.general_project.routes,
    module.maintenance_project.routes,
    module.webprobes_project.routes,
    module.state_machine_project.routes,
  )
  source = "./modules/route_maker"
  API_ID              = aws_apigatewayv2_api.http_api.id
  LAMBDA_INVOKE_ARN   = each.value.invoke_arn
  LAMBDA_ARN          = each.value.arn
  ROUTE               = each.key
  ACCOUNT             = local.ACCOUNT
  REGION              = local.REGION
}

