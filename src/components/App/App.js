import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


import RegisterUser from '../RegisterUser';
import Login from '../Login';
import Home from '../Home';
import Logout from '../Logout';
import { Container } from 'reactstrap';
import { userIsAuthenticatedRedir, userIsNotAuthenticated } from '../../auth';
import store from '../../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Route exact path="/" component={userIsAuthenticatedRedir(Home)} />
            <Route path="/register" component={userIsNotAuthenticated(RegisterUser)} />
            <Route path="/login" component={userIsNotAuthenticated(Login)} />
            <Route path="/logout" component={userIsAuthenticatedRedir(Logout)} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
