// main.js (the new entry point for your frontend)
// -----------------------------------------------------------------------------
// This file ties everything together. It imports the modules that define state,
// DOM references, helper functions, display logic, add/edit/delete handlers, etc.
// Then, it sets up initial event listeners and fetches the items on load.
// -----------------------------------------------------------------------------

import { currentDate, setCurrentDate } from './modules/state.js';
import { dateSelector, form } from './modules/dom.js';
import { updateDisplay } from './modules/display.js';
import { fetchItems } from './modules/fetchItems.js';
import { handleAddItem } from './modules/addHandler.js';

// ----------------------------------------------------------------------------
// 1) On page load, set date selector and attach event
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  if (dateSelector) {
    dateSelector.value = currentDate;
    dateSelector.addEventListener('change', () => {
      setCurrentDate(dateSelector.value);
      updateDisplay();
    });
  }

  // ----------------------------------------------------------------------------
  // 2) Hook up the "Add Item" form
  // ----------------------------------------------------------------------------
  form.addEventListener('submit', handleAddItem);

  // ----------------------------------------------------------------------------
  // 3) Fetch items initially
  // ----------------------------------------------------------------------------
  fetchItems();
});






// ********************************************************************************
// ********************************************************************************







// // script.js
// // -----------------------------------------------------------------------------
// // Main entry point for your frontend. Ties modules together:
// //  - initAuth() for login/register
// //  - fetchItems()
// //  - hooking up add/edit/delete
// // -----------------------------------------------------------------------------

// import { initAuth } from './modules/login.js';
// import { currentDate, setCurrentDate } from './modules/state.js';
// import { fetchItems } from './modules/fetchItems.js';
// import { handleAddItem } from './modules/addHandler.js';
// import { handleEditItem } from './modules/editHandler.js';
// import { handleDeleteItem } from './modules/deleteHandler.js';
// import { updateDisplay } from './modules/display.js';
// // import other modules if needed

// import { dateSelector, form } from './modules/dom.js';
// // If you store your references in dom.js

// document.addEventListener('DOMContentLoaded', () => {
//   // 1) Initialize login/register UI
//   initAuth();

//   // 2) Setup date selector
//   const ds = document.getElementById('date-selector');
//   if (ds) {
//     ds.value = currentDate;
//     ds.addEventListener('change', () => {
//       setCurrentDate(ds.value);
//       updateDisplay();
//     });
//   }

//   // 3) Hook up the "Add Item" form
//   const shoppingForm = document.getElementById('shopping-form');
//   if (shoppingForm) {
//     shoppingForm.addEventListener('submit', handleAddItem);
//   }

//   // 4) Delegation for Edit / Delete clicks
//   //    Because we dynamically create buttons, we can do event delegation on the table
//   const table = document.getElementById('history-table');
//   table.addEventListener('click', (e) => {
//     if (e.target.classList.contains('edit-btn')) {
//       handleEditItem(e);
//     } else if (e.target.classList.contains('delete-btn')) {
//       handleDeleteItem(e);
//     }
//   });

//   // 5) Fetch items on load
//   fetchItems();
// });
