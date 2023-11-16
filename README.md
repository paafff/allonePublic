# allonePublic
allone Project Public Version

Don't forget to set up the database configuration in the Database.js file in the backend directory.


const dbSetting = new Sequelize('name_database', 'user_database', 'password_user', {
  host: 'localhost',
  dialect: 'mysql',
});
