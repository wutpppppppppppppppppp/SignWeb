'use strict';

function loginPage() {
  return `
    <html>
      <head>
        <title>Login</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
          }
          form {
            background: white;
            padding: 2em;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1, h2 {
            margin: 0 0 1em;
          }
          input {
            width: 100%;
            padding: 0.5em;
            margin: 0.5em 0;
            border: 1px solid #ccc;
            border-radius: 3px;
          }
          button {
            padding: 0.7em 1.5em;
            color: white;
            background: #007BFF;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          button:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <form action="http://localhost:3000/login" method="post">
          <h1>Login</h1>
          <h2>Email</h2>
          <input type="email" name="email" required>
          <h2>Password</h2>
          <input type="password" name="password" required>
          <br><br>
          <button type="submit">Login</button>
        </form>
      </body>
    </html>
  `;
}

function defaultPage(isAuthenticated) {
  if (isAuthenticated) {
    return `
      logged in
      <br><br>
      <a href="/logout">Logout</a>
    `;
  } else {
    return `
      please login
      <br><br>
      <a href="/login">Login</a>
    `;
  }
}

module.exports = {
  loginPage,
  defaultPage
};
