module.exports = {
  restApiRoot: '/api',
  host: '0.0.0.0',
  port: process.env.VCAP_APP_PORT || 3000,
  remoting: {
    context: false,
    rest: {
      handleErrors: false,
      normalizeHttpPath: false,
      xml: false
    },
    json: {
      strict: false,
      limit: '100kb'
    },
    urlencoded: {
      extended: true,
      limit: '100kb'
    },
    cors: false
  }
};
