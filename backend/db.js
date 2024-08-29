const { Client } = require("pg")

 
const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/postgres"
})

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// Function to create the users table if it doesn't exist
const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      email VARCHAR(255) PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone_no VARCHAR(15) NOT NULL,
      verified BOOLEAN DEFAULT false
    );
  `;

  try {
    const result = await client.query(query);
    console.log(result);
  } catch (err) {
    console.error("Error creating users table:", err);
  }
};

const getUsersData = async() => {
  const query = `
    INSERT INTO users (email, username, password, phone_no)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = ['gautam123@example.com', 'gautam123', 'securepassword', '1234567890'];

  try {
    const data = await client.query(query, values);
    console.log(data.rows);
  } catch (error) {
    console.log(`Error while fetching data ${error}`);
  }
};

createUsersTable();
getUsersData();
module.exports = client;