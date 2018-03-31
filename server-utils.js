let cachedHeaders = new Map()

function getNewHeaders (newHeaders) {
  const newKeys = Object.keys(newHeaders)
  let returnHeadersObject = null
  newKeys.forEach(newKey => {
    const header = cachedHeaders.get(newKey)
    const newHeader = newHeaders[newKey]
    if (!header || header !== newHeader) {
      if (!returnHeadersObject) {
        returnHeadersObject = {}
      }
      returnHeadersObject[newKey] = newHeader
      cachedHeaders.set(newKey, newHeader)
    }
  })
  return returnHeadersObject
}

module.exports = {getNewHeaders}