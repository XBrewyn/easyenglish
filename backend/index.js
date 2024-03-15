const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const routers = require('./routers');
const authMiddleware = require('./middlewares/auth');
const urlImagesMiddleware = require('./middlewares/images');

dotenv.config();

const {
  NODE_ENV,
  PORT = 3000,
  BUILD_PATH,
  ENV_PRODUCTION
} = process.env;

const app = express();

// Common Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Development Middleware
if (NODE_ENV !== ENV_PRODUCTION) {
  app.use(morgan('dev'));
  // CORS Middleware
  app.use(cors());
}

// Custom Middleware
app.use(authMiddleware);
app.use('/api/v1', routers);
app.use(urlImagesMiddleware);

// Serve Static Files
if (NODE_ENV === ENV_PRODUCTION) {
  app.use(express.static(path.join(__dirname, BUILD_PATH)));

  // Server React SPA
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, BUILD_PATH, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  console.log('Environment:', NODE_ENV);
});
