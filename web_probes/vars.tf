variable "AWS_REGION" {
  default = "eu-central-1"
}

variable "PREFIX" {
  type = string
}

variable "ACCESS_KEY" {
  type = string
}

variable "SECRET_KEY" {
  type = string
}

variable "SECRETS" {
  type = map(string)
}