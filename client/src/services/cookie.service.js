const accessTokenName = 'accessToken'
const keepLoggedInName = 'keepLoggedIn'
class CookieService {
  getAccessToken() {
    const parts = `; ${document.cookie}`.split(`; ${accessTokenName}=`)
    return parts[1]?.split('; ')[0]
  }

  getKeepLoggedIn() {
    const parts = `; ${document.cookie}`.split(`; ${keepLoggedInName}=`)
    return parts[1]?.split('; ')[0]
  }
}

const cookieService = new CookieService()

export default cookieService