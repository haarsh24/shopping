import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './containers/Home/home'

import Cart from './containers/Cart/Cart'
import Login from './components/UI/Login/Login'
import Logout from './components/UI/Logout/logout'
import Order from './containers/Order/Order'

function App() {
  return (
    <div className="App">
      <Switch>
      
        <Route path='/cart' exact component={Cart} />
        <Route path='/order' exact component={Order} />
        <Route path='/login' exact component={Login} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/' exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
