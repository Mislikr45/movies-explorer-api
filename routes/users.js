const router = require('express').Router();
const {
  validateUserUpdate,
} = require('../utils/validation');

const {
  getUser, updateUserInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', validateUserUpdate, updateUserInfo);

module.exports = router;
