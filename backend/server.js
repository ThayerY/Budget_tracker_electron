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




//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


// server.js
// -----------------------------------------------------------------------------
// Main entry point for your back-end server. Uses ES modules thanks to
// "type": "module" in package.json.
// -----------------------------------------------------------------------------

// (A) Imports
// -----------------------------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { itemRouter } from './routes/itemRoutes.js';

// (B) Connect to MongoDB
// -----------------------------------------------------------------------------
await connectDB();  // Make sure your db.js exports a function named connectDB

// (C) Initialize Express
// -----------------------------------------------------------------------------
const app = express();

// (D) Middleware
// -----------------------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());

// (E) Serve your frontend as static files
// -----------------------------------------------------------------------------
// If your frontend folder is at the project root: "frontend"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// (F) API Routes
// -----------------------------------------------------------------------------
app.use('/items', itemRouter);   // All item-related routes

// (G) Default route to serve index.html
// -----------------------------------------------------------------------------
// This means "GET /" will load the main 'index.html' from your frontend folder.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// (H) Start Server
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

