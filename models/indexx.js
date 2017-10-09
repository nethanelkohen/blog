var config = require(__dirname + '/../config/config.json')[env];
if (config.use_env_variable) {
  var db_info = process.env[config.use_env_variable].match(/([^:]+):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  config.dialect = db_info[1];
  config.username = db_info[2];
  config.password = db_info[3];
  config.host = db_info[4];
  config.port = db_info[5];
  config.database = db_info[6];
}
