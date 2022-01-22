locals {
    lambda_definitions = {
        state_machine_maker = {
            path = "state_machine_maker"
            ENV     = var.ENV["GENERAL"]
        },
    }
   
}