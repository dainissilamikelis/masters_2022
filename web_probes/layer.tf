data "archive_file" "main_layer" {
  type          = "zip"
  source_dir    = "${path.module}/layer/main"
  output_path   = "${path.module}/zips/main-layer.zip"
}

data "archive_file" "common_layer" {
  type          = "zip"
  source_dir    = "${path.module}/layer/common"
  output_path   = "${path.module}/zips/common-layer.zip"
}


resource "aws_lambda_layer_version" "main_layer" {
  filename              =  data.archive_file.main_layer.output_path
  layer_name            = "${local.PREFIX}-main"
  source_code_hash      = filebase64sha256(data.archive_file.main_layer.output_path)
  compatible_runtimes   = ["nodejs14.x"]
}

resource "aws_lambda_layer_version" "common_layer" {
  filename              =  data.archive_file.common_layer.output_path
  layer_name            = "${local.PREFIX}-common"
  source_code_hash      = filebase64sha256(data.archive_file.common_layer.output_path)
  compatible_runtimes   = ["nodejs14.x"]
}

