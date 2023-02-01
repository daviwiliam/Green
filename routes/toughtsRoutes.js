const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/make', checkAuth, ToughtController.makeTought)
router.post('/make', checkAuth, ToughtController.toughtSave)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/edit/:id', checkAuth, ToughtController.editTought)
router.post('/edit', checkAuth, ToughtController.editToughtSave)
router.post('/delete', checkAuth, ToughtController.deleteTought)
router.get('/', ToughtController.showToughts)

module.exports = router