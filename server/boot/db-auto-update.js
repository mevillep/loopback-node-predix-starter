module.exports = function(app) {
  if (app.dataSources.database.connected) {
    if (app.dataSources.database.settings.name !== 'postgres') { return; }
    app.dataSources.database.isActual(function(err, actual) {
      if (!actual) {
        app.dataSources.database.autoupdate();
      }
    });
  } else {
    app.dataSources.database.once('connected', function() {
      if (app.dataSources.database.settings.name !== 'postgres') { return; }
      app.dataSources.database.isActual(function(err, actual) {
        if (!actual) {
          app.dataSources.database.autoupdate();
        }
      });
    });
  }
};
