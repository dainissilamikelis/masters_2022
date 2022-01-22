resource "aws_apigatewayv2_api" "http_api" {
  name                = "${local.PREFIX}-api"
  protocol_type       = "HTTP"
  cors_configuration  {
    allow_headers       = ["*"]
    allow_origins       = ["*"]
    allow_methods       = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "example" {
  api_id = aws_apigatewayv2_api.http_api.id
  name   = "dev"
  auto_deploy = true
}