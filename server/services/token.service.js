import jwt from 'jsonwebtoken'
import config from 'config'
import Token from '../models/Token.js'

class TokenService {
  async generateAccessToken(payload) {
    return await jwt.sign(payload, config.get('accessSecretKey'), {
      expiresIn: config.get('accessKeyExpiresMS')
    })
  }

  async generateRefreshToken(payload) {
    return await jwt.sign(payload, config.get('refreshSecretKey'))
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

  async findToken(user) {
    try {
      return await Token.findOne({ user })
    } catch (e) {
      return null
    }
  }
}

const tokenService = new TokenService
export default tokenService