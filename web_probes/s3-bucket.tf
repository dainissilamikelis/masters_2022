resource "aws_s3_bucket" "web-probe-bucket" {
  bucket = "${local.PREFIX}-bucket-masters-ds11021"
  acl    = "public-read"

  lifecycle_rule {
    enabled = true
    expiration {
      days = 2
    }
  }
}
resource "aws_s3_bucket_policy" "allow_access" {
  bucket = aws_s3_bucket.web-probe-bucket.id
  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": [
              aws_s3_bucket.web-probe-bucket.arn,
              "${aws_s3_bucket.web-probe-bucket.arn}/*"
            ]
        }
    ]
  })
}