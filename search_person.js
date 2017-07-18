const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const name = process.argv[2];

knex.select('*')
  .from('famous_people')
  .where('first_name', 'like', '%'+name+'%') //OBJ SYNTAX??
  .orWhere('last_name', 'like', '%'+name+'%')
  .asCallback((err, result) => {
    if(err) {
      return console.error("error running query", err);
    }
    for (let i = 0; i < result.length; i++) {
      console.log(`- ${i+1}: ${result[i].first_name} ${result[i].last_name}, born '${formatDate(result[i].birthdate)}'`);
    }
    knex.destroy();
  //process.exit(0);
  })


function formatDate(birthdate) {
  return birthdate.toISOString().substr(0, 10);
};
























