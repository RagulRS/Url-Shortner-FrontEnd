import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
 

  return (
    <>
      <div>
        
        <BrowserRouter>
              <Routes>
                <Route path ="/" element={<Login/>} ></Route>
                <Route path ="/home" element={<Home/>} ></Route>
                <Route path ="/signup" element={<Signup/>} ></Route>
                <Route path ="/forgotPassword" element={<ForgotPassword/>} ></Route>
                <Route path ="/resetPassword/:token" element={<ResetPassword/>} ></Route>

              </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
