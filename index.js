const express = require("express");
const app = express();
const queryRoutes = require("./routes/queryRoutes");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler.js");
const connectdb = require("./config/dbconnection");
const userRegistration=require("./routes/userRoutes");
const PORT = process.env.PORT || 3000;

connectdb();
app.use(express.json());
app.use("/api/users",userRegistration);
app.use("/api", queryRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
