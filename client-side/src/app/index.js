import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../actions/setAuthToken'
import { setCurrentUser } from '../actions/authentication'

import { NavBar } from '../components'
import { UsersList, UsersRegister, UsersLogin, UsersUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

if (localStorage.jwtToken && localStorage.jwtToken !== undefined) {
    console.log('test')
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        window.location.href = '/users/login'
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/users/list" exact component={UsersList} />
                    <Route path="/users/register" exact component={UsersRegister} />
                    <Route path="/users/login" exact component={UsersLogin} />
                    <Route
                        path="/users/update/:id"
                        exact
                        component={UsersUpdate}
                    />
                </Switch>
            </Router>
        </Provider>
    )
}

export default App