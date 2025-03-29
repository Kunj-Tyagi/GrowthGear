const asyncHandler = require("express-async-handler");

// @desc Validate query
// @routes GET /api/validate?q=Show me all employees who live on Jupiter
// @access Public

exports.validateQuery = asyncHandler(async (req, res) => {
  const naturalQuery = req.query.q;

  if (!naturalQuery) {
    res.status(400);
    throw new Error("Query is not found!!");
  }

  let valid = true;
  let reason = "";

  const invalidTerms = ["Mars", "Jupiter", "Pluto", "Atlantis"];

  for (const term of invalidTerms) {
    if (naturalQuery.includes(term)) {
      valid = false;
      reason = `Invalid location '${term}' does not exist in the database.`;
      break;
    }
  }

  res.json({ query: naturalQuery, valid, reason });
});
