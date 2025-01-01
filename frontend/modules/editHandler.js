// modules/editHandler.js
// -----------------------------------------------------------------------------
// This file handles the "edit item" logic, including converting times to/from AM/PM.
// -----------------------------------------------------------------------------

import { shoppingHistory } from './state.js';
import { getDayName, convertTo24Hour, formatTo12Hour } from './helpers.js';
import { updateDisplay } from './display.js';

/** handleEditItem: triggered by clicking the "Edit" button for a row */
export async function handleEditItem(e) {
  const itemId = e.target.dataset.id;
  const itemIndex = shoppingHistory.findIndex(it => it._id === itemId);
  if (itemIndex === -1) return;

  const item = shoppingHistory[itemIndex];
  const row = e.target.closest('tr');
  if (!row) return;

  // We'll replace the date & time cells with input fields
  const dateCell = row.children[2];
  const timeCell = row.children[3];
  const actionsCell = row.children[4];

  // Create input fields
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.value = item.date;

  const timeInput = document.createElement('input');
  timeInput.type = 'time';
  timeInput.value = convertTo24Hour(item.time);

  // Clear existing cells and place inputs
  dateCell.innerHTML = '';
  timeCell.innerHTML = '';
  dateCell.appendChild(dateInput);
  timeCell.appendChild(timeInput);

  // Replace actions with a Save button
  actionsCell.innerHTML = '';
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  actionsCell.appendChild(saveBtn);

  // On Save
  saveBtn.addEventListener('click', async () => {
    const newDate = dateInput.value;
    const newTime24 = timeInput.value;
    if (!newDate || !newTime24) {
      alert("Please enter both date and time.");
      return;
    }

    // Convert 24-hour back to AM/PM
    const newTimeAMPM = formatTo12Hour(newTime24);
    const updatedItem = {
      ...item,
      date: newDate,
      time: newTimeAMPM,
      day: getDayName(newDate)
    };

    try {
      const response = await fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local array
      shoppingHistory[itemIndex] = updatedItem;
      updateDisplay();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  });
}










// ********************************************************************************
// ********************************************************************************






// // modules/editHandler.js
// // ----------------------------------------------------------------------------
// // Called when user clicks "Edit". We show date/time inputs, then do PUT /items/:id
// // ----------------------------------------------------------------------------

// import { shoppingHistory } from './state.js';
// import { updateDisplay } from './display.js';

// export async function handleEditItem(e) {
//   const itemId = e.target.dataset.id;
//   if (!itemId) return;

//   const itemIndex = shoppingHistory.findIndex(it => it._id === itemId);
//   if (itemIndex === -1) return;

//   const item = shoppingHistory[itemIndex];
//   const row = e.target.closest('tr');
//   if (!row) return;

//   // dateCell = 3rd col, timeCell = 4th col, etc. Adjust if your table differs.
//   const dateCell = row.children[2];
//   const timeCell = row.children[3];
//   const actionsCell = row.children[5]; // 6th col is "Actions"

//   // Create inputs
//   const dateInput = document.createElement('input');
//   dateInput.type = 'date';
//   dateInput.value = item.date;

//   const timeInput = document.createElement('input');
//   timeInput.type = 'time';
//   // If item.time is "HH:MM" (24h), set directly
//   // If it's "5:15 PM", convert first. For simplicity, let's assume 24h stored.
//   timeInput.value = convertTo24Hr(item.time);

//   // Clear cells, place inputs
//   dateCell.innerHTML = '';
//   timeCell.innerHTML = '';
//   dateCell.appendChild(dateInput);
//   timeCell.appendChild(timeInput);

//   // Save button
//   actionsCell.innerHTML = '';
//   const saveBtn = document.createElement('button');
//   saveBtn.textContent = 'Save';
//   actionsCell.appendChild(saveBtn);

//   // On Save
//   saveBtn.addEventListener('click', async () => {
//     const newDate = dateInput.value;
//     const newTime24 = timeInput.value;

//     if (!newDate || !newTime24) {
//       alert('Please provide both date and time');
//       return;
//     }

//     // Build updated item
//     const updatedItem = {
//       ...item,
//       date: newDate,
//       time: convertTo12Hr(newTime24),
//       // you can also recalc day if needed
//     };

//     try {
//       const res = await fetch(`http://localhost:3000/api/items/${itemId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedItem),
//         credentials: 'include',
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const itemFromServer = await res.json();

//       // Update local array with the newly updated fields
//       shoppingHistory[itemIndex] = itemFromServer;
//       updateDisplay();
//     } catch (err) {
//       console.error('Error updating item:', err);
//       alert('Failed to update item.');
//     }
//   });
// }

// // Example time conversion
// function convertTo24Hr(timeStr) {
//   // If stored as "5:15 PM", convert
//   // For example, "HH:MM" => "HH:MM" in 24-hour
//   // This is just a placeholder. Adjust as needed.
//   // If your item.time is already "17:15", then just return it.
//   if (timeStr.includes('AM') || timeStr.includes('PM')) {
//     // parse it out
//     const [timePart, ampm] = timeStr.split(' ');
//     let [hr, min] = timePart.split(':');
//     hr = parseInt(hr, 10);
//     if (ampm === 'PM' && hr < 12) hr += 12;
//     if (ampm === 'AM' && hr === 12) hr = 0;
//     return `${String(hr).padStart(2, '0')}:${min}`;
//   }
//   return timeStr; // already in 24-hr
// }

// function convertTo12Hr(time24) {
//   // e.g. "17:15" => "5:15 PM"
//   const [h, m] = time24.split(':');
//   let hour = parseInt(h, 10);
//   const ampm = hour >= 12 ? 'PM' : 'AM';
//   hour = hour % 12 || 12;
//   return `${hour}:${m} ${ampm}`;
// }










