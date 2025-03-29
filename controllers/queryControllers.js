const asyncHandler = require("express-async-handler");

// Mock data responses for different queries
const mockData = {
  "SELECT * FROM employees WHERE joining_year > 2020;": [
    { id: 1, name: "Alice", joining_year: 2021 },
    { id: 2, name: "Bob", joining_year: 2022 },
  ],
  "SELECT name, department FROM employees;": [
    { name: "Alice", department: "Engineering" },
    { name: "Bob", department: "Marketing" },
  ],
  "SELECT * FROM employees WHERE department = 'Engineering';": [
    { id: 1, name: "Alice", department: "Engineering" },
  ],
  "SELECT COUNT(*) FROM employees;": [{ count: 42 }],
  "SELECT * FROM employees ORDER BY salary DESC LIMIT 5;": [
    { id: 5, name: "John", salary: 95000 },
    { id: 6, name: "Emma", salary: 92000 },
    { id: 7, name: "Mike", salary: 88000 },
    { id: 8, name: "Sophia", salary: 85000 },
    { id: 9, name: "David", salary: 83000 },
  ],
};

// @desc Convert natural language into SQL-query
// @route GET /api/query?q=Show me all employees who joined after 2020
// @access Public
exports.processQuery = asyncHandler(async (req, res) => {
  const naturalQuery = req.query.q;

  if (!naturalQuery) {
    res.status(400);
    throw new Error("Query parameter 'q' is missing.");
  }

  let pseudoSQL = "UNKNOWN QUERY";
  let result = [];

  // Simple natural language to SQL conversion logic
  if (
    naturalQuery.toLowerCase().includes("employees") &&
    naturalQuery.toLowerCase().includes("joined after")
  ) {
    pseudoSQL = "SELECT * FROM employees WHERE joining_year > 2020;";
  } else if (
    naturalQuery
      .toLowerCase()
      .includes("list all employees with their departments")
  ) {
    pseudoSQL = "SELECT name, department FROM employees;";
  } else if (
    naturalQuery.toLowerCase().includes("employees in engineering department")
  ) {
    pseudoSQL = "SELECT * FROM employees WHERE department = 'Engineering';";
  } else if (naturalQuery.toLowerCase().includes("total number of employees")) {
    pseudoSQL = "SELECT COUNT(*) FROM employees;";
  } else if (
    naturalQuery.toLowerCase().includes("top 5 highest paid employees")
  ) {
    pseudoSQL = "SELECT * FROM employees ORDER BY salary DESC LIMIT 5;";
  }

  // Fetch the mock response if the query is recognized
  result = mockData[pseudoSQL] || [];

  res.json({ query: naturalQuery, pseudo_sql: pseudoSQL, result });
});
