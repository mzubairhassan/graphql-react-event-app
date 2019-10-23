import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import AuthPage from './pages/Auth';
import MainNavigation from './navigation/MainNavigation';


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <Switch>
          <Redirect path="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/events" component={null} />
          <Route path="/bookings" component={null} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
