const express = require('express');


const userRouter = express.Router();
const Employee = require("./employeemodel");



const createEmployee = async (req, res) => {
  try {
    console.log("req.body from create", req.body);
    const newEmployee = await Employee.create(req.body);
    res.json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// Read All Employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error('Error getting all employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Read Employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.json(employee);
    } catch (error) {
        console.error('Error getting employee by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update Employee by ID
const updateEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const [updatedRowsCount, updatedEmployee] = await Employee.update(req.body, {
            where: { id: employeeId },
            returning: true,
        });

        if (updatedRowsCount === 0) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.json(updatedEmployee[0]);
    } catch (error) {
        console.error('Error updating employee by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete Employee by ID
const deleteEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedRowsCount = await Employee.destroy({
            where: { id: employeeId },
        });

        if (deletedRowsCount === 0) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Employee.findOne({
        where: {
          username,
          password,
        },
      });
  
      if (user) {
        // Successfully logged in
        res.status(200).json({ message: "Login successful" });
      } else {
        // Invalid login credentials
        res.status(401).json({ message: "Invalid login credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

userRouter.post("/",createEmployee);// Create Table  
userRouter.get("/", getAllEmployees); // Read All
userRouter.get("/:id", getEmployeeById); // Read by ID
userRouter.put("/:id", updateEmployeeById); // Update by ID  
userRouter.delete("/:id", deleteEmployeeById); // Delete by ID


module.exports = {userRouter}
