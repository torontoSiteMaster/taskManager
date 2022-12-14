const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/task-routes');

dotenv.config();

/* -------------------
 Create express app
---------------------- */
const app = express();

// DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DATABASE CONNECTED"))
    .catch((error) => console.log("DATABASE CONNECTION ERROR: ", error))

/* ----------------
 Apply middleware/s
------------------- */
// 1. Cors function 
app.use(cors())

// 2. The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())

// 3. ROUTES
// User Route
app.use('/api/user', userRoutes);
// Task Route
app.use('/api/task', taskRoutes);

// PORT Listener
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));