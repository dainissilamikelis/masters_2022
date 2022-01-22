resource "aws_apigatewayv2_integration" "integration" {
  api_id                    = var.API_ID
  connection_type           = "INTERNET"
  integration_type          = "AWS_PROXY"
  description               = "Lambda example"
  integration_method        = "POST"
  integration_uri           = var.LAMBDA_INVOKE_ARN
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "route" {
  api_id              = var.API_ID
  route_key           = var.ROUTE
  target              = "integrations/${aws_apigatewayv2_integration.integration.id}"
  authorization_type  = var.AUTHORIZER_ID == null ? null : "CUSTOM" 
  authorizer_id       = var.AUTHORIZER_ID
}

resource "aws_lambda_permission" "integration_invoke" {
  action =  "lambda:invokeFunction"
  function_name =  var.LAMBDA_ARN
  principal = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.REGION}:${var.ACCOUNT}:${var.API_ID}/*/*${split(" ", var.ROUTE)[1]}"
}
