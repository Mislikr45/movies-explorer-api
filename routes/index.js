const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateLogin, validateRegistration } = require('../utils/validation');
const routerUser = require('./users');
const routerMovie = require('./movies');

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use(routerUser);
router.use(routerMovie);

router.use((req, res, next) => next(
  new NotFoundError('Страницы по запрошенному URL не существует'),
));
module.exports = router;
