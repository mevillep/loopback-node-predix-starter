var services = JSON.parse(process.env.VCAP_SERVICES);
var pg = services.postgres[0].credentials;
module.exports = {
  database: {
    host: pg.host,
    port: pg.port,
    database: pg.database,
    password: pg.password,
    name: 'postgres',
    user: pg.username,
    connector: 'postgresql'
  }
};
