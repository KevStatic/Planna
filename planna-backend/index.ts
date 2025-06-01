import express, { Request, Response } from 'express';
import pool from './db';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// --- Routes ---
// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).send('Database connection failed');
  }
});

// Create user
app.post('/users', async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Error creating user');
  }
});

// Get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
});