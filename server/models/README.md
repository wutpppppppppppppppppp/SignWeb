The models folder contains database schemas and models. Keeping them separate from controllers ensures a clear distinction between data manipulation and business logic.

```JavaScript
// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Schema definition
});

module.exports = mongoose.model('User', userSchema);
```
