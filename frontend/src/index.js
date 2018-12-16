import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import App from './app'
import { history } from './helpers/history'
import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-utilities/bootstrap-utilities.css'
import 'react-s-alert/dist/s-alert-default.css'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('main')
)