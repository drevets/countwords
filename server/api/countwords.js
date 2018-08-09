const router = require('express').Router();
module.exports = router

router.get('/', (req, res, next) => {
  console.log('hit the route')
  res.json('thanks for counting words!')
})
