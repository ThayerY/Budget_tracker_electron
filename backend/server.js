// // server.js
// // -----------------------------------------------------------------------------
// // Main entry point for your back - end server.Uses ES modules thanks to
// // "type": "module" in package.json.
// // -----------------------------------------------------------------------------

// // (A) Imports
// // -----------------------------------------------------------------------------

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
// ********************************************************************************


// // backend/server.js


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





// ********************************************************************************
// ********************************************************************************




// // backend/server.js
// // -----------------------------------------------------------------------------
// // Main server file. Connects to DB, sets up express-session, routes, and
// // serves the frontend from ../frontend (so you can open http://localhost:3000).
// // -----------------------------------------------------------------------------

// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import { connectDB } from './config/db.js';
// import { userRoutes } from './routes/userRoutes.js';
// import { itemRouter } from './routes/itemRoutes.js';

// await connectDB(); // connect to Mongo

// const app = express();

// // If you want to allow requests from the same server only, you can skip cors entirely,
// // but let's keep it in case you want to open from a different origin.
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));

// app.use(express.json());

// // set up session
// app.use(session({
//   secret: 'SUPER_SECRET_SESSION_KEY',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI
//   }),
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24, // 1 day
//   }
// }));

// // mount API routes
// app.use('/api', userRoutes);
// app.use('/api', itemRouter);

// // Serve the frontend from ../frontend
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const publicPath = path.join(__dirname, '../frontend');
// app.use(express.static(publicPath));

// // If no other route matched, serve index.html (so direct visits work)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

// // start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });

