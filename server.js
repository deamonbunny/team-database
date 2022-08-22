const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'DB_USER',
      // TODO: Add MySQL password here
      password: 'DB_PASSWORD',
      database: 'DB_LIBRARY'
    },
    console.log(`Connected to the movies_db database.`)
  );


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });