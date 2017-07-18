const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1;", ['%'+name+'%'], (err, result) => {
  //console.log(name);
  if (err) {
    return console.error("error running query", err);
  }
  console.log("Searching...");
  console.log(`Found ${result.rowCount} person(s) by the name ${name}:`);
  for (let i = 0; i < result.rowCount; i++) {
    console.log(`- ${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${formatDate(result.rows[i].birthdate)}'`);
  }
  client.end();
  });
});
function formatDate(birthdate) {
  return birthdate.toISOString().substr(0, 10);
};





