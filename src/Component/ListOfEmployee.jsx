import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { deleteEmployee, listEmployees } from '../Services/EmployeeService';

const ListOfEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigator('/add-Employee');
  }

  function updateEmployee(id) {
    navigator(`/update-Employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container showPage">
      <h2>List of Employees</h2>
      <button className="btn btn-primary mb-3" onClick={addNewEmployee}>
        Add Employee
      </button>

      {/* Responsive Table Container */}
     
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td className="action-buttons">
                  <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
  );
};

export default ListOfEmployee;
