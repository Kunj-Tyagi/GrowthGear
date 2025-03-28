// @desc explain query
// @routes GET /api/explain?q=Show me all employees who joined after 2020
// @access Public

exports.explainQuery = (req, res) => {
    const naturalQuery = req.query.q;
  
    if (!naturalQuery) {
      return res.status(400).json({ error: "Missing query parameter 'q'" });
    }
  
    const explanation = {
      original_query: naturalQuery,
      parsed_steps: [
        "Identified table: employees",
        "Filtered condition: joining_year > 2020",
      ],
    };
  
    res.json(explanation);
  };
  