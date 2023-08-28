import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserErrors } from '../../store/user'
import { getAuthErrors } from '../../store/auth'
import { getProjectsErrors } from '../../store/projects'
import { getRecordsErrors } from '../../store/records'
import toast from 'react-hot-toast'
import { parseServerErrors } from '../../utils/parseServerErrors'

const withToastErrors = Component => props => {
  const userErrors = useSelector(getUserErrors())
  const authErrors = useSelector(getAuthErrors())
  const projectsErrors = useSelector(getProjectsErrors())
  const recordsErrors = useSelector(getRecordsErrors())

  useEffect(() => {
    if (userErrors.message)
      toast.error(parseServerErrors(userErrors.message))
  }, [userErrors])

  useEffect(() => {
    if (authErrors.message)
      toast.error(parseServerErrors(authErrors.message))
  }, [authErrors])

  useEffect(() => {
    if (projectsErrors.message)
      toast.error(parseServerErrors(projectsErrors.message))
  }, [projectsErrors])

  useEffect(() => {
    if (recordsErrors.message)
      toast.error(parseServerErrors(recordsErrors.message))
  }, [recordsErrors])

  return <Component {...props} />
}

export default withToastErrors