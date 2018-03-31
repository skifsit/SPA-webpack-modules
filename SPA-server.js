const http = require('http')
const fs = require('fs')
const port = 6335

const {getNewHeaders} = require('./server-utils.js')

const favicon = fs.readFileSync('./favicon.ico')
const index = fs.readFileSync('./dist/index.html', 'utf8')
const appBundle = fs.readFileSync('./dist/app.bundle.js', 'utf8')
const lodashJoinBundle = fs.readFileSync('./dist/lodash_join.chunk.js', 'utf8')
// const vendorBundle = fs.readFileSync('./dist/vendor.bundle.js', 'utf8')

const requestHandler = (req, res) => {
  if (req.url === '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon; binary')
    return res.end(favicon)
  }
  console.log(req.url, req.method)
  const newHeaders = getNewHeaders(req.headers)
  if (newHeaders) {
    console.log(newHeaders)
  }
  if (req.method === 'GET') {
    if (req.url === '/app.bundle.js') {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      return res.end(appBundle)
    }
    if (req.url === '/vendor.bundle.js') {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      return res.end(vendorBundle)
    }
    if (req.url === '/lodash_join.chunk.js') {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      return res.end(lodashJoinBundle)
    }
    res.end(index)
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})