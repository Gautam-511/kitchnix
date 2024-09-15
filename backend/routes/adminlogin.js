const express = require('express');
const router = express.Router();
const client = require('../db');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middlewares/adminAuth');
const emailAdmin = 'admin@kitchnix.com';
const passwordAdmin = 'admin_password';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === emailAdmin && password === passwordAdmin) {
        const payload = {
            email: emailAdmin,
            role: 'admin'
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Admin login successful',
            token
        });
    } else {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }
});

router.get('/', adminAuth ,async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM recipe');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  });
  
  // Add a new recipe
  router.post('/addrecipe', adminAuth, async (req, res) => {
      const { recipe_name, recipe_description, recipe_cuisine, recipe_cooktime, recipe_cost, recipe_imgurl } = req.body;
  
    try {
      const result = await client.query(
        `INSERT INTO recipe (recipe_name, recipe_description, recipe_cuisine, recipe_cooktime, recipe_cost, recipe_imgurl) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [recipe_name, recipe_description, recipe_cuisine, recipe_cooktime, recipe_cost, recipe_imgurl]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding recipe:', error);
      res.status(500).json({ error: 'Failed to add recipe' });
    }
  });
  
  // Update an existing recipe
  router.put('/updaterecipe/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { recipe_name, recipe_description, recipe_cuisine, recipe_cooktime, recipe_cost, recipe_imgurl } = req.body;
  
    try {
      const result = await client.query(
        `UPDATE recipe
        SET recipe_name = $1, recipe_description = $2, recipe_cuisine = $3, recipe_cooktime = $4, recipe_cost = $5, recipe_imgurl = $6
        WHERE recipe_id = $7
        RETURNING *`,
        [recipe_name, recipe_description, recipe_cuisine, recipe_cooktime, recipe_cost, recipe_imgurl, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Failed to update recipe' });
    }
  });
  
  // Delete a recipe
  router.delete('/deleterecipe/:id',adminAuth , async (req, res) => {
    const { id } = req.params;
  
    try {
      await client.query('DELETE FROM recipe WHERE recipe_id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  });

module.exports = router;
