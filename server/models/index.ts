const Sequelize = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize('postgres://josepabellanapuyol:pass@database:5432/tactictoe');
const db:any = {};
db.Users = require('./users')(sequelize, Sequelize.DataTypes);

db.Ais = require('./ais')(sequelize, Sequelize.DataTypes);

db.Users.hasMany(db.Ais);
db.Ais.belongsTo(db.Users);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {db};