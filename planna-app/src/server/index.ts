import express from 'express'
import { api } from './api.js'

const app = express()
app.use(api)
app.get('/api/hi', (req, res) => res.send('Hello from Planna!'));
app.listen(3002, () => { console.log('Server is running on port 3002 :)') })