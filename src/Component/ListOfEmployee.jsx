import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { deleteEmployee, listEmployees } from '../Services/EmployeeService'
const ListOfEmployee = () => {

  const[employees, setEmployees] = useState([])
  const navigator = useNavigate();
  useEffect(()=> {
     getAllEmployees(); 
  },[]
)

function getAllEmployees(){
  listEmployees().then((response)=>{
    setEmployees(response.data);
  }).catch(error => {
    console.error(error);
  })
}

   function addNewEmployee(){
     navigator('/add-Employee');
   }

   function updateEmployee(id){
    navigator(`/update-Employee/${id}`);
   }

   function removeEmployee(id){
    console.log(id);
    deleteEmployee(id).then((response) => {
    getAllEmployees();
    }).catch(error => {
      console.error(error);
    })
   }

 return (
    <div className='container showPage'>
      <h2>List of Employees</h2>
      <button className='btn btn-primary mb-5' onClick={addNewEmployee}>Add employee</button>
      
      <table className='table table-striped table'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            employees.map(employee =>
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                  <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                    style={{marginLeft:'20px'}}
                    >Delete</button>
                </td>
                </tr>
            )
          }
         </tbody>
      </table>          
    </div>
  
            )
}

export default ListOfEmployee