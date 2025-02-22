const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005",
    "http://10.0.60.44:3000",
    "http://10.0.60.44:3001",
    "http://10.0.60.44:3002",
    "http://10.0.60.44:3003",
    "http://10.0.60.44:3004",
    "http://10.0.60.44:3005",
  ],
  credentials: true,
};

module.exports = corsOptions;
