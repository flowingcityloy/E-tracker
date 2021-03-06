const { printTable } = require('console-table-printer');
const { viewEmployeesString, viewEmployeesByManagerString, viewEmployeesByDepartmentString, addEmployeeString, removeEmployeeString, updateEmployeeRoleString, updateEmployeeManagerString } = require("./EmployeesQuery")
const { viewAllDepartmentString } = require("./DepartmentsQuery")
const inquirer = require('inquirer');
const employee = {

    viewEmployees: async (query, menu) => {
        const data = await query(viewEmployeesString);

        printTable(data);
        menu();
    },
    viewEmployeesByManager: async (query, menu) => {

        const employeeData = await query(viewEmployeesString)

        const newData = employeeData.map(manager => {
            return {
                name: manager.first_name + " " + manager.last_name + " ",
                value: manager.id
            }
        })


        newData.push({
            name: "None",
            value: null
        })
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "manager_id",
                message: "Who is the manager ? (Required)",
                choices: newData,
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please choose the manager for this employee!");
                        return false;
                    }
                }
            },
        ])

        const data = await query(viewEmployeesByManagerString, [answer.manager_id]);

        printTable(data);
        menu();
    },
    viewEmployeesByDepartment: async (query, menu) => {

        const departmentData = await query(viewAllDepartmentString)

        const newData = departmentData.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        })



        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "department_id",
                message: "waht is the department ? (Required)",
                choices: newData,
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please choose the manager for this employee!");
                        return false;
                    }
                }
            },
        ])

        const data = await query(viewEmployeesByDepartmentString, [answer.department_id]);

        printTable(data);
        menu();
    },

    addEmployee: async (query, menu) => {
        const employeeData = await query(viewEmployeesString)

        const newData = employeeData.map(manager => {
            return {
                name: manager.first_name + " " + manager.last_name + " ",
                value: manager.id
            }
        })


        newData.push({
            name: "None",
            value: null
        })

        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name? (Required)",
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("You need to add the first name!");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name? (Required)",
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("You need to add the last name!");
                        return false;
                    }
                }
            },
            {
                type: "list",
                name: "role_id",
                message: "Please add the role title for the new employee. (Required)",
                choices: async () => {
                    const data = await query(" SELECT * FROM role ")
                    return data.map(role => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
                },
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("You need to add the new role id!");
                        return false;
                    }
                }
            },
            {
                type: "list",
                name: "manager_id",
                message: "Who is the manager for this employee? (Required)",
                choices: newData,
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please choose the manager for this employee!");
                        return false;
                    }
                }
            },
        ])

        const data = await query(addEmployeeString, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
        await console.log("You have successfully added the new employee's first name, last name and role title!");
        await employee.viewEmployees(query, menu);
    },

    removeEmployee: async (query, menu) => {
        const employeeData = await query(viewEmployeesString);
        const employees = employeeData.map(employee => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }
        });

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Which employee would you like to remove? (Required)",
                choices: employees,
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please choose the employee!");
                        return false;
                    }
                }
            },
        ])
        await query(removeEmployeeString, [answer.employee_id]);
        await console.log("You have successufully removed an employee!");
        await employee.viewEmployees(query, menu);
    },

    updateEmployeeRole: async (query, menu) => {

        const employeeData = await query(viewEmployeesString)
        const employees = employeeData.map(employee => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }
        })

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Which employee would you like to update? (Required)",
                choices: employees,
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please choose the employee!");
                        return false;
                    }
                }
            },
            {
                type: "list",
                name: "role_id",
                message: "What is the employee's new role? (Required)",
                choices: async () => {
                    const roleData = await query("SELECT * FROM role")
                    return roleData.map(role => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
                },
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please enter the role for the employee!");
                        return false;
                    }
                }
            },
        ])
        await query(updateEmployeeRoleString, [answer.role_id, answer.employee_id]);
        await console.log("You have successully updated a new role!");
        await employee.viewEmployees(query, menu);
    },

    updateEmployeeManager: async (query, menu) => {

        const employeeData = await query(viewEmployeesString)
        const employees = employeeData.map(employee => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }
        })

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "id",
                message: "Which employee do you want to set as manager for this selected employee? (Required)",
                choices: async () => {
                    const employeeData = await query(viewEmployeesString)
                    return employeeData.map(employee => {
                        return {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id
                        }
                    })
                },
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please choose a manager for the selected employee!");
                        return false;
                    }
                }
            },
            {
                type: "list",
                name: "manager_id",
                message: "Which employee's manager would you like to update? (Required)",
                choices: employees,
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please select an employee!");
                        return false;
                    }
                }
            },

        ])
        await query(updateEmployeeManagerString, [answer.manager_id, answer.id]);
        await console.log("You have successully updated a manager!");
        await employee.viewEmployees(query, menu);
    }
}

module.exports = employee;