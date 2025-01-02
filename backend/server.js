const express = require('express');
const connectDB = require('./config/db');
const companyRoutes = require('./routes/companyRoutes');
const communicationRoutes = require('./routes/communicationRoutes');
const methodRoutes = require('./routes/methodRoutes');
const cors = require('cors');



const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// OR enable CORS for a specific origin (in your case, the frontend running on port 3001)
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL if needed
}));




connectDB();

app.use('/api/companies', companyRoutes);
app.use('/api/communications', communicationRoutes);
app.use('/api/methods', methodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
