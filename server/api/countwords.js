const router = require('express').Router();
const textract = require('textract')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('hit the route')
  console.log('req.body', req.body)
  textract.fromUrl(req.url, (error, text) => {
    console.log('extracting text...')
    if (error) console.log(error)
    console.log(text)
    res.json(text)
  })
})
