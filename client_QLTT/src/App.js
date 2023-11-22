
import './App.css';
import Doctor from './components/doctor';
import HomeComponent from './components/home';
import { NavBar } from './components/nav';
import CreatePatient from './components/create_patient';
import ScheduleComponent from './components/schedule';
import VerifySchedule from './components/verifySchedule';
import Manage_schedule from './components/manage_schedule';

import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {
  // function App() {


  render() {

    
    return (
      <div className="App ">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={(HomeComponent)} />
            <Route path="/doctor" exact component={(Doctor)} />

            {/* <Route path="/create-patient" component={(CreatePatient)} /> */}
            <Route path="/create-patient">
              <CreatePatient />
            </Route>

            <Route path="/schedule/:id" >
              <ScheduleComponent />
            </Route>
            <Route path="/verify-booking">
              <VerifySchedule />
            </Route>
            <Route path="/manage-schedule" component={(Manage_schedule)} />

          </Switch>
        </Router>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Có chàng trai viết lên cây</h1>
        </header> */}
      </div>
    );
  }
}

export default App;
