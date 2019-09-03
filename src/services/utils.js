export const renderElement = (target, htmlStr) => {
  target.innerHTML = element(htmlStr)
  return target
}

export const element = (htmlStr = '') => htmlStr.trim()

export const stringify = (obj = {}) => JSON.stringify(obj)

export const toJSON = (str = '') => JSON.parse(str)
