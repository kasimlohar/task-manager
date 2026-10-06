// Load settings from .env file
require('dotenv').config();

// Bring in tools we installed
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database first
connectDB();

// Make a new app
const app = express();

// Pick frontend address from .env or use local
let clientURL = process.env.CLIENT_URL || 'http://localhost:5173';

// Remove last slash if present
if (clientURL.endsWith('/')) {
  clientURL = clientURL.slice(0, -1);
}

// Let only that frontend talk to this API
app.use(cors({ origin: clientURL }));
// Let app read JSON data
app.use(express.json());

// Bring in task routes
const taskRoutes = require('./routes/taskRoutes');

// Send task requests to task file
app.use('/api/tasks', taskRoutes);

// Simple check route
app.get('/', function (req, res) {
  res.json({ message: 'Task API is running' });
});

// Bring in error helpers
const errorHelpers = require('./middleware/errorHandler');

// Catch unknown URLs
app.use(errorHelpers.notFound);

// Catch all other errors
app.use(errorHelpers.errorHandler);

// Pick port from .env file, or use 5000
const port = process.env.PORT || 5000;

// Start listening for visitors
app.listen(port, function () {
  console.log('Server is running on port ' + port);
});
