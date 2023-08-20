export const parseErrors = ({ errors }) => {
  const parsedErrors = errors.reduce((errorObject, error) => ({
    ...errorObject,
    [error.path]: error.msg
  }), {})
  return {
    errors: { formErrors: parsedErrors }
  }
}
