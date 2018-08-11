import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


import RegisterUser from '../RegisterUser';
import Login from '../Login';
import Home from '../Home';
import AddTimeEntry from '../TimeEntry/AddTimeEntry';
import EditTimeEntry from '../TimeEntry/EditTimeEntry';
import { Container } from 'reactstrap';
import { userIsAuthenticatedRedir, userIsNotAuthenticated, visibleAuthenticated } from '../../auth';
import store from '../../store';
import Navigation from '../Navigation';

class App extends Component {
  render() {
    const ProtectedNavigation = visibleAuthenticated(() => <Navigation />)
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <ProtectedNavigation />
            <Route exact path="/" component={userIsAuthenticatedRedir(Home)} />
            <Route path="/register" component={userIsNotAuthenticated(RegisterUser)} />
            <Route path="/login" component={userIsNotAuthenticated(Login)} />
            <Route exact path="/new-time-entry" component={userIsAuthenticatedRedir(AddTimeEntry)} />
            <Route exact path="/edit-time-entry/:id" component={userIsAuthenticatedRedir(EditTimeEntry)} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
