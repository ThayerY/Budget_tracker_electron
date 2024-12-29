// server.js
// -----------------------------------------------------------------------------
// Main entry point for your back-end server. Uses ES modules thanks to
// "type": "module" in package.json.
// -----------------------------------------------------------------------------

// (A) Imports
// -----------------------------------------------------------------------------

// import dotenv from 'dotenv';

// dotenv.config();  // Load environment variables from .env

// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { connectDB } from './config/db.js';
// import { itemRouter } from './routes/itemRoutes.js';

// // (B) Connect to MongoDB
// // -----------------------------------------------------------------------------
// await connectDB();

// // (C) Initialize Express
// // -----------------------------------------------------------------------------
// const app = express();

// // (D) Middleware
// // -----------------------------------------------------------------------------
// app.use(cors());
// app.use(bodyParser.json());

// // (E) Routes
// // -----------------------------------------------------------------------------
// app.use('/items', itemRouter);   // All item-related routes

// // (F) Start Server
// // -----------------------------------------------------------------------------
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// ********************************************************************************



// backend/server.js
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { itemRouter } from './routes/itemRoutes.js';

// 1) Connect to MongoDB
await connectDB();

// 2) Initialize Express
const app = express();

// 3) Middleware
app.use(cors());
app.use(bodyParser.json());

// 4) Serve static files from ../public (relative to this file)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Adjust if your public folder location differs
const publicPath = path.join(__dirname, '../frontend');
app.use(express.static(publicPath));

// 5) API Routes
app.use('/items', itemRouter);

// 6) If no routes match, serve index.html (React-style fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// 7) Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


