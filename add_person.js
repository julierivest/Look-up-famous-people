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

const first = process.argv[2];
const last = process.argv[3];
const dob = process.argv[4];

knex('famous_people')
  .insert([
    {
      first_name: first,
      last_name: last,
      birthdate: dob
    }
  ])
  .asCallback((err, result) => {
    if(err) {
      return console.error("error running query", err);
    }
    console.log("success", result);
    knex.destroy();
  })

