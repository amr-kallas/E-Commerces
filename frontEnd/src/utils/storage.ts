const tokenChangeEvent = new Event('tokenChange')
const Storage = {
  setToken: (token: string) => {
    localStorage.setItem('token', token)
    window.dispatchEvent(tokenChangeEvent)
  },
  getToken: () => {
    return localStorage.getItem('token')
  },
  removeToken: () => {
    return localStorage.removeItem('token')
  },
  setLanguage: (lang: string) => {
    localStorage.setItem('lang', lang)
  },
  getLanguage: () => {
    return localStorage.getItem('lang')
  },
}
export default Storage
