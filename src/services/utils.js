export const renderElement = (target, htmlStr = '') => {
  target.innerHTML = htmlStr
  return target
}

export const stringify = (obj = {}) => JSON.stringify(obj)

export const toJSON = (str = '') => JSON.parse(str)
