import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';

const EmployeeComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [id]);

  //  Real-time validation effect
  useEffect(() => {
    validateForm(name, email);
  }, [name, email]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm(name, email)) {
      const employee = { name, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.log(error);
        });
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  function validateForm(currentName = name, currentEmail = email) {
    let valid = true;
    const errorsCopy = { ...errors };

    const nameRegex = /^[A-Za-z][A-Za-z\s]{3,}$/;
    if (currentName.trim() && nameRegex.test(currentName.trim())) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'Name must start with a letter, contain only alphabets & spaces, and be at least 4 characters long.';
      valid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (currentEmail.trim()) {
      if (!emailPattern.test(currentEmail)) {
        errorsCopy.email = 'Invalid email format';
        valid = false;
      } else {
        errorsCopy.email = '';
      }
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    return <h2 className='text-center'>{id ? 'Update Employee' : 'Add Employee'}</h2>;
  }

  return (
    <div>
      <div className='container updatePage'>
        <div className='row'>
          <div className='card col-md-4 offset-md-3 offset-md-3'>
            {pageTitle()}
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    placeholder='Enter Employee Name'
                    name='name'
                    value={name}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Email</label>
                  <input
                    type='text'
                    placeholder='Enter Email'
                    name='email'
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>

                <button
                  className='btn btn-success'
                  onClick={saveOrUpdateEmployee}
                  disabled={
                    !name.trim() ||
                    !email.trim() ||
                    errors.name !== '' ||
                    errors.email !== ''
                  }
                >
                  {id ? 'Update' : 'Submit'}
                </button>
                <button 
                  className='btn btn-secondary'
                  onClick={() => navigator('/employees')}
                  >
                  Cancel
                  </button>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
