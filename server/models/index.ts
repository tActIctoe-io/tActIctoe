const Sequelize = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize('postgres://user:pass@postgres:5432/db');
const db:any = {};
db.Users = require('./users')(sequelize, Sequelize.DataTypes);

db.Ais = require('./ais')(sequelize, Sequelize.DataTypes);

db.Users.hasMany(db.Ais);
db.Ais.belongsTo(db.Users);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {db};