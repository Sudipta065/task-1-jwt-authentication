import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';

import Private from './components/Private';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Login} />

        <Route path='/private' component={Private} />
      </Switch>
    </div>
  );
}

export default App;

/**
 *   <Switch>
        <Route path='/' component={Login} />

        <Route path='/private' component={Private} />

        <Route path='/logout' component={Logout} />
      </Switch>
 */
