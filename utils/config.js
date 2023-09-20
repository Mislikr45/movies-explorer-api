const {
  PORT = 3000,
  MONGO = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = '64b47cd7d12efe505db55667',
  NODE_ENV,
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO,
  NODE_ENV,
};
