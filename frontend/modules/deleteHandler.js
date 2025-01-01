// modules/deleteHandler.js
// -----------------------------------------------------------------------------
// This file handles the "delete item" logic.
// -----------------------------------------------------------------------------

import { shoppingHistory } from './state.js';
import { updateDisplay } from './display.js';

export async function handleDeleteItem(e) {
  const itemId = e.target.dataset.id;
  if (!itemId) {
    console.error("No item ID found for deletion.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:3000/items/${itemId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Remove from local array
    const index = shoppingHistory.findIndex(item => item._id === itemId);
    if (index !== -1) {
      shoppingHistory.splice(index, 1);
    }
    updateDisplay();
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Failed to delete item. Check console for details.");
  }
}





// ********************************************************************************
// ********************************************************************************






// // today code

// // modules/deleteHandler.js
// // -----------------------------------------------------------------------------
// // This file handles the "delete item" logic.
// // -----------------------------------------------------------------------------

// import { shoppingHistory } from './state.js';
// import { updateDisplay } from './display.js';

// export async function handleDeleteItem(e) {
//   const itemId = e.target.dataset.id;
//   if (!itemId) {
//     console.error("No item ID found for deletion.");
//     return;
//   }

//   const confirmDelete = confirm("Are you sure you want to delete this item?");
//   if (!confirmDelete) return;

//   try {
//     const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
//       method: 'DELETE'
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Remove from local array
//     const index = shoppingHistory.findIndex(item => item._id === itemId);
//     if (index !== -1) {
//       shoppingHistory.splice(index, 1);
//     }
//     updateDisplay();
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     alert("Failed to delete item. Check console for details.");
//   }
// }






// ********************************************************************************
// ********************************************************************************






// // today |||||| code

// // modules/deleteHandler.js
// // -----------------------------------------------------------------------------
// import { shoppingHistory } from './state.js';
// import { updateDisplay } from './display.js';

// export async function handleDeleteItem(e) {
//   const itemId = e.target.dataset.id;
//   if (!itemId) {
//     console.error("No item ID found for deletion.");
//     return;
//   }

//   const confirmDelete = confirm("Are you sure you want to delete this item?");
//   if (!confirmDelete) return;

//   try {
//     // FIX: Use /api/items/<id> instead of /api/<id>
//     const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
//       method: 'DELETE',
//       credentials: 'include',  // only if using sessions
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Remove from local array
//     const index = shoppingHistory.findIndex(item => item._id === itemId);
//     if (index !== -1) {
//       shoppingHistory.splice(index, 1);
//     }
//     updateDisplay();
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     alert("Failed to delete item. Check console for details.");
//   }
// }





