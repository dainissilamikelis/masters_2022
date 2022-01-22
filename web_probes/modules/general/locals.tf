locals {
  default_memory = 256
  lambda_definitions = {
    query = {
      path   = "general/query"
      memory = local.default_memory
      ENV    = var.ENV["GENERAL"]
    },
  }

}
