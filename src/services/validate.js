export const validate = {
  cep: (value = '') => {
    value = value.replace(/\D/g, '')
    if (value.length !== 8) {
      return false
    }
    return true
  },
  phone: (value = '') => {
    value = value.replace(/\D/g, '')
    if (value.length < 10 || value.length > 11) {
      return false
    }
    return true
  },
  email: (value = '') => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value.toLowerCase())
  }
}