const URL_REGEX = /(http:\/\/(?:www.|(?!www))[A-z0-9-]+\.[^\s]+)|(https:\/\/(?:www.|(?!www))[A-z0-9-]+\.[^\s]+)/;

const BAD_REQUEST_ERROR = 'Переданы некорректные данные при создании карточки';
const NOT_FOUND_ERROR = ' Карточка с указанным _id не найдена';
const ACESS_ERROR = 'Нет прав для удаления карточки';
const AUTHORIZATION_ERROR = 'Ошибка авторизации';
const DEFAULT_ERROR = 'Ошибка по умолчанию';
const EMAIL_ERROR = 'Пользователь с таким электронным адресом уже зарегистрирован';

module.exports = {
  URL_REGEX,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  ACESS_ERROR,
  AUTHORIZATION_ERROR,
  DEFAULT_ERROR,
  EMAIL_ERROR,
};
