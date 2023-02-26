const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/profile/:id', UserController.profile)
router.get('/profile/', checkAuth, UserController.userProfile)
router.get('/edit/:id', checkAuth, UserController.editProfile)
router.post('/save/edit/:id', checkAuth, UserController.saveEditProfile)


module.exports = router