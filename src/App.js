import React, { useEffect, useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import UserContext from './context/user-context';
import axios from 'axios';
import AppointmentsAdd from './components/Appointment/AppointmentsAdd';
import Appointment from './components/Appointment/Appointment';
import AppointmentEdit from './components/Appointment/AppointmentEdit';
import PatientsAdd from './components/Patient/PatientsAdd';
import PatientsEdit from './components/Patient/PatientsEdit';
import Patient from './components/Patient/Patient';

axios.defaults.baseURL= 'http://localhost:8000/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    console.log(user)
  })
    
  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Header />  
        <Switch>
        <Route path="/" component={Homepage} exact={true}/>
        <Route path="/signup" component={Signup} exact={true}/>
        <Route path="/login" component={Login} exact={true}/>
        <Route path="/appointments" component={Appointments} exact={true}/>
        <Route path="/appointments/add" component={AppointmentsAdd} exact={true}/>
        <Route path="/appointment/:id" component={Appointment} exact={true}/>
        <Route path="/appointment/edit/:id" component={AppointmentEdit} exact={true}/>
        <Route path="/patients" component={Patients} exact={true}/>
        <Route path="/patients/add" component={PatientsAdd} exact={true}/>
        <Route path="/patients/:id" component={Patient} exact={true}/>
        <Route path="/patients/edit/:id" component={PatientsEdit} exact={true}/>
        </Switch>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
