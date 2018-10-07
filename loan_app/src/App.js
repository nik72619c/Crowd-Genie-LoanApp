import React, { Component } from 'react';
import {Switch,Route, NavLink} from 'react-router-dom';
import './App.css';
import { Login } from './components/login_page';
import { AdminDashboard } from './components/admin/admin_dashboard';
import { CustomerDashboard } from './components/customer/customer_dashboard';
import { LenderDasboard } from './components/lender/lender_dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">

        
             <Switch>

               <Route path="/" exact component={Login}/> 
               <Route path="/admin/dashboard" exact component={AdminDashboard}/> 
               <Route path="/customer/dashboard" exact component={CustomerDashboard}/>
               <Route path="/lender/dashboard" exact component={LenderDasboard}/>
               
                </Switch>
      </div>
    );
  }
}

export default App;
