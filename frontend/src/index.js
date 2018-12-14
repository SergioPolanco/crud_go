import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './stores/store';
import App from './app'
import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-utilities/bootstrap-utilities.css'
import 'react-s-alert/dist/s-alert-default.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('main')
)