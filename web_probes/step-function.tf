# core associated role

data "aws_iam_policy_document" "assume_states" {
    statement {
        effect = "Allow"
        principals {
            type =  "Service"
            identifiers = ["states.amazonaws.com"]
        }
        actions = ["sts:AssumeRole"]
    }
}

resource "aws_iam_policy" "invoke-test-lambdas" {
  name        = "${local.PREFIX}invoke-test-lambdas"
  path        = "/"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        "Sid" = "VisualEditor0",
        "Effect" = "Allow",
        "Action" = [
            "lambda:InvokeFunction",
            "lambda:InvokeAsync"
        ],
        "Resource" = [
            "*"
        ]
      }
    ]
  })
  tags        = { Application = local.PREFIX }
}

resource "aws_iam_role" "state-machine" {
  name                  = "${local.PREFIX}-state-machine"
  path                  = "/system/"
  assume_role_policy    = data.aws_iam_policy_document.assume_states.json
  tags                  = { Application = local.PREFIX }
}

resource "aws_iam_role_policy_attachment" "basic-state-machine" {
  policy_arn = aws_iam_policy.step-function-actions.arn
  role       = aws_iam_role.state-machine.name
}

resource "aws_iam_role_policy_attachment" "attach-lamba-invokes" {
  policy_arn = aws_iam_policy.invoke-test-lambdas.arn
  role       = aws_iam_role.state-machine.name
}


resource "aws_sfn_state_machine" "sfn_state_machine" {
  name     = "${local.PREFIX}function"
  role_arn = aws_iam_role.state-machine.arn
  
    // this means nothing! is replaced in first run anyways
  definition = <<EOF
    {
        "Comment": "A Hello World example demonstrating various state types of the Amazon States Language",
        "StartAt": "HelloWorld",
            "States": {
                "HelloWorld": {
                "Type": "Pass",
                "End": true
            }
        }
    }
    EOF
}

