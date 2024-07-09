Middlewares handle tasks like authentication, validation, and error handling. Keeping them separate improves code readability.

```javascript
// middlewares/authMiddleware.js
const verifyToken = (req, res, next) => {
    // Middleware logic to verify JWT token
};

module.exports = {
    verifyToken,
};
```

