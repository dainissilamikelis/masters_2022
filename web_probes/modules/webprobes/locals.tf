locals {
    lambda_definitions = {
        api_cases = {
            path = "api_cases"
             ENV  = var.ENV["GENERAL"]
            memory = 256
        },
        publish_fallback_result = {
            path = "publish_fallback_result"
             ENV  = var.ENV["GENERAL"]
            memory = 256
        },
        publish_results = {
            path = "publish_results"
            ENV  = var.ENV["GENERAL"]
            memory = 256
        },
        puppeteer_cases = {
            path = "puppeteer_cases"
            ENV = var.ENV["GENERAL"]
            memory = 2000
        },
         run_tests = {
            path = "run_tests"
            ENV = var.ENV["GENERAL"]
            memory = 2000
        },
        webprobes_find_data = {
            path    = "webprobes_find_data"
            ENV     = var.ENV["GENERAL"]
            memory = 256
        },
        webprobes_get_data = {
            path    = "webprobes_get_data"
            ENV     = var.ENV["GENERAL"]
            memory = 256
        },
    }
   
}