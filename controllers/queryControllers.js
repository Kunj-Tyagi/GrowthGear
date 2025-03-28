const mockData = {
  "SELECT * FROM employees WHERE joining_year > 2020;": [
    { id: 1, name: "Alice", joining_year: 2021 },
    { id: 2, name: "Bob", joining_year: 2022 },
  ],
};

// @desc to convert natural language into SQL-query
// @routes GET /api/query?q=Show me all employees who joined after 2020
// @access Public

// Process natural language query
exports.processQuery = (req, res) => {
  const naturalQuery = req.query.q;

  if (!naturalQuery) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  let pseudoSQL = "UNKNOWN QUERY";
  let result = [];

  if (
    naturalQuery.includes("employees") &&
    naturalQuery.includes("joined after")
  ) {
    pseudoSQL = "SELECT * FROM employees WHERE joining_year > 2020;";
    result = mockData[pseudoSQL] || [];
  }

  res.json({ query: naturalQuery, pseudo_sql: pseudoSQL, result });
};
