// models/Item.js
// -----------------------------------------------------------------------------
// Defines the Mongoose schema and model for items. Exports the model as "Item".
// -----------------------------------------------------------------------------

import mongoose from 'mongoose';

// Define Schema
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  date: String,
  time: String,
  day: {
    type: String,
    default: 'No day provided'
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   get: function (date) {
  //     // Format as YYYY-MM-DD HH:mm:ss
  //     return date.toISOString().slice(0, 19).replace('T', ' ');
  //   }
  // },
});

// Create and Export Model
export const Item = mongoose.model('Item', itemSchema);






// *******************************************************************************
// ********************************************************************************





// // backend/models/Item.js
// // -----------------------------------------------------------------------------
// // Mongoose model for a shopping "item". We store name, price, date, time, day,
// // plus any other fields needed (like user, if you want).
// // -----------------------------------------------------------------------------

// import mongoose from 'mongoose';

// const itemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   date: { type: String, required: false },
//   time: { type: String, required: false },
//   day: { type: String, required: false },
//   // You could store user references if needed: userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

// // We'll export as default so we can do "import Item from ..."
// const Item = mongoose.model('Item', itemSchema);
// export default Item;




