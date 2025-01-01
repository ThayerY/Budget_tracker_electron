// modules/login.js
// ----------------------------------------------------------------------------
// Handles user register, login, logout with session-based auth. We call
// /api/register, /api/login, /api/logout with credentials: 'include'.
// ----------------------------------------------------------------------------

export function initAuth() {
  const showLoginBtn = document.getElementById('show-login-btn');
  const showRegisterBtn = document.getElementById('show-register-btn');
  const logoutBtn = document.getElementById('logout-btn');

  const loginFormDiv = document.getElementById('login-form');
  const registerFormDiv = document.getElementById('register-form');

  const loginSubmitBtn = document.getElementById('login-submit');
  const registerSubmitBtn = document.getElementById('register-submit');

  // Toggle forms
  showLoginBtn?.addEventListener('click', () => {
    loginFormDiv.style.display = 'block';
    registerFormDiv.style.display = 'none';
  });
  showRegisterBtn?.addEventListener('click', () => {
    registerFormDiv.style.display = 'block';
    loginFormDiv.style.display = 'none';
  });

  // Register
  registerSubmitBtn?.addEventListener('click', async () => {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Registered successfully as ${data.user.username}`);
        // Switch to login form
        loginFormDiv.style.display = 'block';
        registerFormDiv.style.display = 'none';
      } else {
        alert(`Registration error: ${data.error}`);
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Network error during registration');
    }
  });

  // Login
  loginSubmitBtn?.addEventListener('click', async () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Login successful! Welcome ${data.user.username}`);
        // Hide login/register forms, show logout
        loginFormDiv.style.display = 'none';
        registerFormDiv.style.display = 'none';
        showLoginBtn.style.display = 'none';
        showRegisterBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
      } else {
        alert(`Login error: ${data.error}`);
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Network error during login');
    }
  });

  // Logout
  logoutBtn?.addEventListener('click', async () => {
    try {
      const res = await fetch('http://localhost:3000/api/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Logged out successfully');
        logoutBtn.style.display = 'none';
        showLoginBtn.style.display = 'inline-block';
        showRegisterBtn.style.display = 'inline-block';
      } else {
        const data = await res.json();
        alert(`Logout error: ${data.error}`);
      }
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Network error during logout');
    }
  });
}
