// setting this temporarily, since mydb was the test db i created from the mongodb tutorial

dbSettings = {

  development: {
    url: 'mongodb://localhost/mydb'
  },
  production: {
    url: 'mongodb://ryan:asdfasdf1@ds063170.mongolab.com:63170/heroku_app32339793'
  }

};

module.exports = {
  url: 'mongodb://localhost/mydb'
}
