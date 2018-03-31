const http = require('http')
const fs = require('fs')
const port = 6333
const { URLSearchParams } = require('url');

const {getNewHeaders} = require('./server-utils.js')

const favicon = fs.readFileSync('./favicon.ico')
const index = fs.readFileSync('./index.html', 'utf8')
const root = fs.readFileSync('./root.html', 'utf8')
const store = fs.readFileSync('./store.html', 'utf8')
const checkout = fs.readFileSync('./checkout.html', 'utf8')
const nav = fs.readFileSync('./nav.html', 'utf8')

const sampleImage = fs.readFileSync('./sample.png')

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
  let resHTML = ''
  if (req.method === 'GET') {
    switch (req.url) {
      case '/': case '/submit':
        resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED', nav + root)
        break;
      case '/store':
        resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED', nav + store)
        break;
      case '/checkout':
        resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED', nav + checkout)
        break;
      case '/sample.png':
        res.setHeader('Content-Type', 'image/png');
        res.end(sampleImage)
        return
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(resHTML)
  } else if (req.method === 'POST') {
    switch (req.url) {
      case '/submit':
        resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED', nav + root + 'SUCCESSFULL')
        break;
    }
    let stringChunksData = []
    let chunksData = []
    const reqContentType = req.headers['content-type']
    const isFormURL = reqContentType === 'application/x-www-form-urlencoded'
    const isMultipart = reqContentType === 'multipart/form-data'
    req.on('data', (chunk) => {
      if (isFormURL) {
        stringChunksData.push(chunk.toString())
      } else if (isMultipart) {
        chunksData.push(chunk)
      }
    })
    req.on('end', () => {
      if (isFormURL) {
        const searchParamsURL = new URLSearchParams(stringChunksData.join(''))
      } else if (isMultipart) {
        Buffer.from(chunksData)
      }
      res.end(resHTML)
    })
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})