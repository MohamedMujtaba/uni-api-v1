const express = require('express')
const { addSession, getALL } = require('../controllers/sectionController')
const router =express.Router()



router.route('/').post(addSession).get(getALL)




module.exports = router;
