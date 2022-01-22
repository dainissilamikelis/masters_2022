locals {
    lambda_definitions = {
        maintenance_post_entry = {
            path    = "maintenance_post_entry"
            ENV     = var.ENV["GENERAL"]
        },
    }
   
}