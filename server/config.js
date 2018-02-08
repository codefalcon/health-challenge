const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/sail-health-meter',
  port: process.env.PORT || 8000,
};

export default config;
