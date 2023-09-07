export const parseErrors = (data, isForm = true) => {
  if (isForm) {
    const parsedErrors = data.errors.reduce((errorObject, error) => ({
      ...errorObject,
      [error.path]: error.msg
    }), {})
    return {
      errors: { formErrors: parsedErrors }
    }
  }
  return { errors: { message: data } }
}
