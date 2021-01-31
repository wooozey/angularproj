
// const { Pool, Client } = require('pg').native;
// const DATABASE_URL = 'postgres://yuuxrktialqodh:5bc54d1c1ab7b0c192255795641ed40074e7c46509a51dc74db25f510c1f8572@ec2-54-75-231-215.eu-west-1.compute.amazonaws.com:5432/d8d1tsu315k95f';

// const pool = new Pool({
//   connectionString: DATABASE_URL
// });


const express = require("express");
const app = express();
app.use(express.json());

const { Pool } = require('pg');
const PORT = process.env.PORT || 3000;
const pool = new Pool({
  user: "",
  password: "",
  host: "",
  port: 5432,
  database: ""
});

app.listen(PORT, () => {
  console.log("Listening on port" + PORT)
});
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use
app.post('/game', async (request, response) => {
  try {
    const { name, description, players, for_age, difficulty, avrg_time, price, producer, creation_date } = request.body;
    console.log(name, description, players, for_age, difficulty, avrg_time, price, producer, creation_date);
    var test = await pool.query('INSERT into planszowki(name, description, players, for_age, difficulty, avrg_time, price, producer, creation_date) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
      [name, description, players, for_age, difficulty, avrg_time, price, producer, creation_date]);
    response.json(test.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.post('/search', async (request, response) => {
  try {
    const { text } = request.body;
    if (typeof text === 'string') {
      var valueToSearch = '%' + text.toUpperCase() + '%';
      console.log(valueToSearch);
      var test = await pool.query('SELECT * from planszowki WHERE UPPER(name) LIKE $1 OR UPPER(description) LIKE $1 OR UPPER(producer) LIKE $1',
        [valueToSearch]);
      response.json(test.rows);
    } else {
      response.json({ error: 'Invalid request, please input text' });
    }
  } catch (error) {
    console.error(error);
  }
});

app.delete('/game', async (request, response) => {
  try {
    const { id } = request.body;
    console.log(id);
    if (typeof id === 'number' && id % 1 == 0) {
      var test = await pool.query('DELETE FROM planszowki WHERE id=$1 RETURNING id',
        [id]);
      console.log(test);
      response.json(test.rows[0]);
    } else {
      response.json({ error: 'Invalid request, please input a number' });
    }
  } catch (error) {
    console.error(error);
  }
});


app.get('/games', async (request, response) => {
  try {
    var test2 = await pool.query('SELECT * from planszowki');
    response.json(test2.rows);
  } catch (error) {
    console.error(error);
  }
});

app.put('/game', async (request, response) => {
  try {
    const { id, name, description, players, for_age, difficulty, avrg_time, price, producer, creation_date } = request.body;
    console.log(id);
    if(typeof id === 'number' && id % 1 == 0) {
      var test = await pool.query('UPDATE planszowki SET name = $2, description = $3,  players = $4, for_age = $5, difficulty = $6, avrg_time = $7, price = $8, producer = $9, creation_date = $10 WHERE id=$1',
        [id, name, description, players, for_age, difficulty, avrg_time, price, producer, creation_date]);
      console.log(test);
      response.json(test.rows[0]);
    } else {
      response.json({ error: 'Invalid request, please input a number' });
    }
  } catch (error) {
    console.error(error);
  }
});

app.get('/', function (request, response) {
  response.send('Hello World!');
});
