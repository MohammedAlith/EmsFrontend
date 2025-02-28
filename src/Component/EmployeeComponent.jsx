import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';

const EmployeeComponent = () => {

const[name, setName] = useState('')
const[email, setEmail] = useState('')

const {id} = useParams();

const[errors, setErrors] = useState({
  name: '',
  email: ''
})

const navigator = useNavigate();

useEffect(() => {

  if(id){
    getEmployee(id).then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
    }).catch(error => {
      console.error(error);
    })
  }
},[id])


function saveOrUpdateEmployee(e){
  e.preventDefault();

  if(validateForm()){
    const employee = {name,email}
  console.log(employee);

   if(id){
    updateEmployee(id, employee).then((response) => {
      console.log(response.data);
      navigator('/employees')
    }).catch(error =>{
      console.log(error);
    })
   } else {
    createEmployee(employee).then((response) => {
      console.log(response.data);
      navigator('/employees')
    }).catch(error => {
      console.error(error);
    })
}
  
  }
}

function validateForm(){
  let valid = true;

  const errorsCopy = {... errors}

  if(name.trim()){
    errorsCopy.name = '';
  }else {
    errorsCopy.name = 'Name is required';
    valid = false;
  }

  if(email.trim()){
    errorsCopy.email = '';
  }else {
    errorsCopy.email = 'Email is required';
    valid = false;
  }

  setErrors(errorsCopy);
  return valid;
}


function pageTitle(){
  if(id){
    return <h2 className='text-center'>Update Employee</h2>
  }else{
    return <h2 className='text-center'>Add Employee</h2>
  }
}


return (
    <div>
      
       <div className='container updatePage'>
      
        <div className='row'>
          <div className='card col-md-4 offset-md-3 offset-md-3'>
            {
              pageTitle()
            }
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Name</label>
                  <input 
                    type='text'
                    placeholder='Enter Employee Name'
                    name='name'
                    value={name}
                    className={`form-control ${errors.name ? 'is-invalid':''}`}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  {errors.name && <div className='invalid-feedback'> {errors.name}</div>}
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Email</label>
                  <input 
                    type='text'
                    placeholder='Enter Email'
                    name='email'
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid':''}`}
                    onChange={(e) =>setEmail(e.target.value)}
                  ></input>
                  {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                </div>
    <button className='btn btn-success'onClick={saveOrUpdateEmployee} >Submit</button>           
              </form>
            </div>
          </div>
        </div>
       </div>

    </div>
  )
}

export default EmployeeComponent