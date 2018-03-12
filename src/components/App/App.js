import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import RegisterUser from '../RegisterUser';
import Login from '../Login';
import Home from '../Home';
import { Container } from 'reactstrap';
import { userIsAuthenticatedRedir, userIsNotAuthenticated } from '../../auth';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Route exact path="/" component={userIsAuthenticatedRedir(Home)} />
            <Route path="/register" component={userIsNotAuthenticated(RegisterUser)} />
            <Route path="/login" component={userIsNotAuthenticated(Login)} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
