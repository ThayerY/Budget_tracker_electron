// modules/state.js
// -----------------------------------------------------------------------------
// This file defines and exports the main "state" variables and constants
// used throughout the application. Keeping them in one place helps with
// future maintainability, especially when integrating with Electron.
// -----------------------------------------------------------------------------

export let shoppingHistory = []; // Updated by fetch calls and handlers

// Constants
export const dailyLimit = 25000;  // The five-day spending limit
export const monthlyBudget = 150000; // The monthly budget

// We'll store currentDate as a "mutable" variable that we can change on dateSelector change
export let currentDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

// A function to set currentDate from other modules (like main.js)
export function setCurrentDate(newDate) {
  currentDate = newDate;
}







// ********************************************************************************
// ********************************************************************************



// // modules/state.js
// // ----------------------------------------------------------------------------
// // Holds global app state, like the array of items (shoppingHistory), current date,
// // daily limit, etc.
// // ----------------------------------------------------------------------------

// export const shoppingHistory = []; // We'll store the fetched items here
// export let currentDate = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
// export const dailyLimit = 25000; // or any other limit
// export const monthlyBudget = 150000; // The monthly budget

// export function setCurrentDate(newDate) {
//   currentDate = newDate;
// }
