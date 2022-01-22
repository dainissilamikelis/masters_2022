
resource "aws_iam_role_policy_attachment" "dynamo_policy" {
  for_each = merge(
    module.general_project.policy_configuration.dynamo_policy,
    module.maintenance_project.policy_configuration.dynamo_policy,
    module.webprobes_project.policy_configuration.dynamo_policy,
    module.state_machine_project.policy_configuration.dynamo_policy,
  )
  policy_arn = aws_iam_policy.dynamo_actions.arn
  role       = split("/", each.value)[1]
}


resource "aws_iam_role_policy_attachment" "file_policy" {
  for_each = merge(
    module.webprobes_project.policy_configuration.file_policy
  )
  policy_arn = aws_iam_policy.file_actions.arn
  role       = split("/", each.value)[1]
}


resource "aws_iam_role_policy_attachment" "step_function_policy" {
  for_each = merge(
    module.webprobes_project.policy_configuration.step_function_policy,
    module.state_machine_project.policy_configuration.step_function_policy
  )
  policy_arn = aws_iam_policy.step-function-actions.arn
  role       = split("/", each.value)[1]
}


