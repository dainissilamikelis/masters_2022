variable "PREFIX" {
  type = string
}

variable "LAYERS" {
  type = list(string)
}

variable "ENV" {
  type = map(map(string))
}

