"use strict";

let pg   = require('pg');
var argv = require('yargs').argv;

let conString = process.env.DATABASE_URL || "postgres://test:test@localhost/test_db";

let herokuConfig = 'SELECT table_schema,table_name FROM information_schema.tables;';
let dropUrls = "DROP TABLE IF EXISTS urls; CREATE TABLE urls (p_id SERIAL PRIMARY KEY, url TEXT NOT NULL, created_on CHAR(13) NOT NULL, access_count INTEGER NOT NULL);";
let dropImageSearches = "DROP TABLE IF EXISTS image_searches; CREATE TABLE image_searches (p_id SERIAL PRIMARY KEY, search_term TEXT NOT NULL, timestamp CHAR(13) NOT NULL);";

if (process.env.ON_HEROKU) {
  pg.defaults.ssl = true;
  console.log('Connected to postgres! Getting schemas...');
  runSingleQuery(herokuConfig, showResults);
}

if (argv.u) {
  console.log("Dropping urls and recreating...");
  runSingleQuery(dropUrls, showResults);
}

if (argv.i) {
  console.log("Dropping image_searches and recreating...");
  runSingleQuery(dropImageSearches, showResults);
}

if (!argv.u && !argv.i) {
  console.log("You need to specify which table(s) to reset.");
  console.log("-u for urls");
  console.log("-i for image_searches");
}

function runSingleQuery(queryString, callback) {
  let client = new pg.Client(conString);
  client.connect( (err) => {
    if (err) callback(err);
    client.query(queryString, (err, result) => {
      if (err) callback(err);
      callback(null, result);
      client.end();
    });
  });
}

function showResults(err, results) {
  if (err) throw err;
  for (let i = 0; i < results.rows.length; i++) {
    console.log(results.rows[i]);
  }
}
