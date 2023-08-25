export const clearUserFields = user => {
  const data = { ...user._doc }

  delete data.password
  delete data._id
  delete data.__v
  delete data.createdAt
  delete data.updatedAt

  return data
}