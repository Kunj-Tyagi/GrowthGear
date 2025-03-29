const asyncHandler = require("express-async-handler");
// @desc explain query
// @routes GET /api/explain?q=Show me all employees who joined after 2020
// @access Public

exports.explainQuery = asyncHandler(async (req, res) => {
  const naturalQuery = req.query.q;

  if (!naturalQuery) {
    res.status(400);
    throw new Error("Query is not found!!");
  }

  const explanation = {
    original_query: naturalQuery,
    parsed_steps: [
      "Identified table: employees",
      "Filtered condition: joining_year > 2020",
    ],
  };

  res.json(explanation);
});
