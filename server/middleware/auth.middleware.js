import tokenService from '../services/token.service.js'
import serverErrors from '../serverErrors.js'

export const auth = async (req, res, next) => {
  if (req.method === 'OPTIONS')
    return next()
  
  try {
    const accessToken = req.headers.authorization?.split(' ')?.[1]

    const data = accessToken && await tokenService.validateAccessToken(accessToken)

    if (!data)
      return res.status(401).json({
        error: { message: serverErrors.unauthorized }
      })
    req.userId = data._id
    next()
  } catch (e) {
    return res.status(401).json({
      error: { message: serverErrors.unauthorized }
    })
  }
}