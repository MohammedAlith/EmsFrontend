
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeeComponent from './Component/EmployeeComponent'

import HeaderComponent from './Component/HeaderComponent'
import ListOfEmployee from './Component/ListOfEmployee'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
    <Routes>
      {/* // http://localhost:3000 */}
      <Route path='/'element = {<ListOfEmployee/>}></Route>

       {/* //http://localhost:3000/employees */}
       <Route path='/employees' element = {<ListOfEmployee/>}></Route>

       {/* //http://localhost:3000/add-employee */}
       <Route path='/add-Employee' element={<EmployeeComponent/>}></Route>

        {/* //http://localhost:3000/update-employee/1 */}
       <Route path='/update-Employee/:id' element = {<EmployeeComponent/>}></Route>
       </Routes>
   
</BrowserRouter>
      
    </>
  )
}

export default App
