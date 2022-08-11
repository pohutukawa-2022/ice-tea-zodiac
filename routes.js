const express = require('express')
const router = express.Router()
const fs = require('fs').promises
const path = require('path')

// Server configuration
router.use(express.static('public'))
router.use(express.urlencoded({ extended: false }))

// Our route showing the results should go here

module.exports = router
