import jwt from 'jsonwebtoken'
import config from 'config'
import Token from '../models/Token.js'

class TokenService {
  async generate(payload) {
    const accessToken = await jwt.sign(payload, config.get('accessSecretKey'), {
      expiresIn: '1h'
    })
    const refreshToken = await jwt.sign(payload, config.get('refreshSecretKey'))

    return {
      accessToken, refreshToken, expiresIn: 3600
    }
  }

  async save(user, refreshToken) {
    const data = await Token.findOne({ user })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }
    return await Token.create({ user, refreshToken })
  }

  async validateRefreshToken(refreshToken) {
    try {
      return await jwt.verify(refreshToken, config.get('refreshSecretKey'))
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  async validateAccessToken(accessToken) {
    try {
      return await jwt.verify(accessToken, config.get('accessSecretKey'))
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (e) {
      return null
    }
  }
}

const tokenService = new TokenService
export default tokenService