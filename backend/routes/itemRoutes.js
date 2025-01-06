// // routes/itemRoutes.js
// // -----------------------------------------------------------------------------
// // This file defines the routes (GET/POST/PUT/DELETE) for items. It uses the Item
// // model and the convertTo12HourFormat helper to ensure times are stored/shown
// // properly.
// // -----------------------------------------------------------------------------

// import express from 'express';
// import { Item } from '../models/Item.js';
// import { convertTo12HourFormat } from '../helpers/timeConversion.js';

// export const itemRouter = express.Router();

// // GET /items
// itemRouter.get('/', async (req, res) => {
//   try {
//     const items = await Item.find();
//     const formattedItems = items.map(item => ({
//       ...item.toObject(),
//       time: convertTo12HourFormat(item.time),
//     }));
//     res.json(formattedItems);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error fetching items' });
//   }
// });

// // POST /items
// itemRouter.post('/', async (req, res) => {
//   try {
//     const itemToSave = {
//       ...req.body,
//       time: convertTo12HourFormat(req.body.time),
//     };
//     const newItem = new Item(itemToSave);
//     const savedItem = await newItem.save();
//     res.json(savedItem);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error adding item' });
//   }
// });

// // PUT /items/:id
// itemRouter.put('/:id', async (req, res) => {
//   try {
//     const updatedItemData = {
//       ...req.body,
//       time: convertTo12HourFormat(req.body.time),
//     };
//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id,
//       updatedItemData,
//       { new: true }
//     );
//     res.json(updatedItem);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error updating item' });
//   }
// });

// // DELETE /items/:id
// itemRouter.delete('/:id', async (req, res) => {
//   try {
//     await Item.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Item deleted' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error deleting item' });
//   }
// });










// ********************************************************************************
// ********************************************************************************





// in this code I added a user login and logout.

// // backend/routes/itemRoutes.js
// // -----------------------------------------------------------------------------
// // Routes for creating, fetching, updating, and deleting "items".
// // -----------------------------------------------------------------------------
// // We assume user must be logged in (session) to do item operations, so we use
// // requireAuth. If not logged in, returns 401.
// // -----------------------------------------------------------------------------

// import express from 'express';
// import Item from '../models/Item.js';

// const router = express.Router();

// /** Simple middleware to check session user */
// function requireAuth(req, res, next) {
//   if (!req.session.user) {
//     return res.status(401).json({ error: 'Not logged in' });
//   }
//   next();
// }

// /**
//  * GET /api/items - fetch all items
//  */
// router.get('/items', requireAuth, async (req, res) => {
//   try {
//     const items = await Item.find({});
//     res.json(items);
//   } catch (err) {
//     console.error('Error fetching items:', err);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// /**
//  * POST /api/items - create a new item
//  * Expects { name, price, date, time, day }
//  */
// router.post('/items', requireAuth, async (req, res) => {
//   try {
//     const { name, price, date, time, day } = req.body;
//     const newItem = new Item({ name, price, date, time, day });
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (err) {
//     console.error('Error creating item:', err);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// /**
//  * PUT /api/items/:id - update existing item
//  * Expects e.g. { name, price, date, time, day } in body
//  */
// router.put('/items/:id', requireAuth, async (req, res) => {
//   try {
//     const { id } = req.params;
//     // Merge the fields from req.body
//     const updatedData = { ...req.body };
//     // If you need to do time conversion or other logic, do it here
//     // e.g. updatedData.time = convertTo12HourFormat(req.body.time);

//     const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true });
//     if (!updatedItem) {
//       return res.status(404).json({ error: 'Item not found' });
//     }
//     res.json(updatedItem);
//   } catch (err) {
//     console.error('Error updating item:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// /**
//  * DELETE /api/items/:id - delete item
//  */
// router.delete('/items/:id', requireAuth, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedItem = await Item.findByIdAndDelete(id);
//     if (!deletedItem) {
//       return res.status(404).json({ error: 'Item not found' });
//     }
//     res.status(200).json({ message: 'Item deleted successfully' });
//   } catch (err) {
//     console.error('Delete item error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// export { router as itemRouter };







// ********************************************************************************
// ********************************************************************************





// routes/itemRoutes.js
// -----------------------------------------------------------------------------
// This file defines the routes (GET/POST/PUT/DELETE) for items. It uses the Item
// model and the convertTo12HourFormat helper to ensure times are stored/shown
// properly.
// -----------------------------------------------------------------------------


import express from 'express';
// import { Item } from '../models/Item.js';
import { getItems } from './crud/get.js';
import { postItem } from './crud/post.js';
import { putItem } from './crud/put.js';
import { deleteItem } from './crud/delete.js';

export const itemRouter = express.Router();

// GET /items
itemRouter.get('/', getItems);

// POST /items
itemRouter.post('/', postItem);

// PUT /items/:id
itemRouter.put('/:id', putItem);

// DELETE /items/:id
itemRouter.delete('/:id', deleteItem);

