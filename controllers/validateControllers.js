// @desc Validate query
// @routes GET /api/validate?q=Show me all employees who live on Jupiter
// @access Public

exports.validateQuery = (req, res) => {
    const naturalQuery = req.query.q;
  
    if (!naturalQuery) {
      return res.status(400).json({ error: "Missing query parameter 'q'" });
    }
  
    let valid = true;
    let reason = "";
  
    if (naturalQuery.includes("Mars")) {
      valid = false;
      reason = "Invalid location 'Mars' does not exist in the database.";
    }
  
    res.json({ query: naturalQuery, valid, reason });
  };