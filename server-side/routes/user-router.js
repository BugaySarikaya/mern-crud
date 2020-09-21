const express = require('express')
const router = express.Router()
// const passport = require('../passport/passport')
const passport = require('passport')
require('../passport/passport')(passport)
const UserCtrl = require('../controllers/user-ctrl')

router.post('/register', UserCtrl.createUser)
router.post('/login', UserCtrl.loginUser)
router.put('/user/:id', UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/users', passport.authenticate('jwt', { session: false }), UserCtrl.getUsers)

module.exports = router