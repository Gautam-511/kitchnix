const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const auth = require('./routes/auth');
const loginRouter = require('./routes/login');

app.use(express.json());
app.use(cors())
app.use('/api/v1',loginRouter);
app.use('/api/v1',auth);

app.get('/', (req, res) => {
  res.json({
    msg: "hello there!"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
