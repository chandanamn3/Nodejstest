const { Sequelize, sequelize } = require("./database-config");

const Employee = sequelize
.define(
  "employee",
  {
  
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true,
        validate:{
            isEmail: true,
        } 
    },
    password: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
  },
  {
    tableName: "employee",
    timestamps: true,
  }
);
module.exports = Employee;