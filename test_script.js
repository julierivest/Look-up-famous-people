const pg = require("pg");
const settings = require("./settings"); // settings.json

//NEW??
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  //SELECT 1 as number -- >to make them sql strings -- in array
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    //console.log(result);
    console.log(result.rows[0].number); //output: 1
    client.end();
  });
});