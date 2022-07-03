import './App.css';
// import { React , useState } from 'react'

import React, { Component } from 'react'
import { Route , Switch , BrowserRouter as Router } from 'react-router-dom'
// import Login from './components/Login'
// import Feedback from './components/Form';
// import Display from './components/Display'
import First_page from './First_page'
import Form from './Form'
import Verify from './Verify'
import {useState , useEffect} from 'react'

function App() {
  const LOCAL_STORAGE_KEY= "students"
  const[students, setStudents]=useState([])
  const addstudenthandler =(student)=>{
  setStudents([...students , student])
  }
  // useEffect(() => {
  //   const retriveStudents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveStudents) setStudents(retriveStudents);
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
  // }, [students]);
  return (
    
   <div>
    <Router>
      <Switch>
        <Route exact path='/'  render={() => <First_page/> }></Route>
        <Route exact path='/form' render={() => <Form a={addstudenthandler}/>}></Route>
        <Route exact path='/verify'  render={()=> <Verify  st={students}/>}></Route> 
      </Switch>
    </Router>

   </div>
  );
}

export default App;
