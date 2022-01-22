resource "aws_dynamodb_table" "core_table" {
  name           = "${local.PREFIX}-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "PK"
  range_key      = "SK"

  attribute {
    name = "PK"
    type = "S"
  }

  attribute {
    name = "SK"
    type = "S"
  }

   attribute {
    name = "result"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

   global_secondary_index {
      name               = "result-SK-index"
      hash_key           = "result"
      range_key          = "SK"
      projection_type    = "ALL"
    }
  

 tags = { Application = local.PREFIX }
}
