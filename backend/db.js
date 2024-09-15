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

// Function to create inventory, recipe, and ingredients tables
const createAdditionalTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS inventory (
      ingredient_id SERIAL,
      ingredient_name VARCHAR(50) NOT NULL,
      available_quantity INT NOT NULL,
      ingredient_cost NUMERIC(5,2) CHECK(ingredient_cost > 0) NOT NULL,
      PRIMARY KEY (ingredient_id)
    );

    CREATE TABLE IF NOT EXISTS recipe (
      recipe_id SERIAL,
      recipe_name TEXT NOT NULL,
      recipe_description TEXT NOT NULL,
      recipe_cuisine TEXT NOT NULL,
      recipe_level TEXT,
      recipe_cooktime INT NOT NULL,
      recipe_cost NUMERIC(5,2) NOT NULL,
      recipe_isveg BOOLEAN DEFAULT true,
      recipe_imgurl VARCHAR(200),
      PRIMARY KEY (recipe_id)
    );

    CREATE TABLE IF NOT EXISTS ingredients (
      recipe_id INT,
      ingredient_id INT,
      quantity_used INT NOT NULL,
      PRIMARY KEY (recipe_id, ingredient_id),
      FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id) ON DELETE CASCADE,
      FOREIGN KEY (ingredient_id) REFERENCES inventory (ingredient_id) ON DELETE CASCADE
    );
  `;

  try {
    await client.query(query);
    console.log("Additional tables (inventory, recipe, ingredients) created or already exist.");
  } catch (err) {
    console.error("Error creating additional tables:", err);
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
createAdditionalTables();
getUsersData();
module.exports = client;