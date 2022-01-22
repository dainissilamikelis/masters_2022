resource "aws_iam_policy" "dynamo_actions" {
  name = "${local.PREFIX}-dynamo_actions"
  path = "/"
  policy = trimspace(jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid    = "1"
      Effect = "Allow"
      Action = [
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:BatchWriteItem",
        "dynamodb:UpdateItem",
      ]
      Resource = [
        aws_dynamodb_table.core_table.arn,
        "*"
      ]
    }]
  }))
}

resource "aws_iam_policy" "file_actions" {
  name = "${local.PREFIX}-file_s3_actions"
  path = "/"
  policy = trimspace(jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Sid    = "1"
      Effect = "Allow",
      Action = [
        "*"
      ]
      Resource = [
        "*",
      ]
    }]
  }))
}



resource "aws_iam_policy" "step-function-actions" {
  name        = "${local.PREFIX}-step-function-actions"
  path        = "/"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
        {
            "Sid" = "",
            "Effect" = "Allow",
            "Action" = [
                "states:UpdateStateMachine",
                "states:StartExecution"
            ],
            "Resource" = "*"
        }
    ]
})
  tags        = { Application = local.PREFIX}
}