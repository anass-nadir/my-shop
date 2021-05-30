interface IValidationError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
  field?: string;
}
