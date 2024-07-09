# Configuration files can be placed in the config folder.

## This includes environment variables, database configurations, and more.

```JavaScript
// config/database.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 
```
