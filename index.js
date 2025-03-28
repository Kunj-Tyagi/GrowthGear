const express = require("express");
const app = express();
const queryRoutes = require("./routes/queryRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", queryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
