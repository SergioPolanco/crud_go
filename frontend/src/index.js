import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './views/homePage'
import UsersPage from './views/User/usersPage'
import CreateUserPage from './views/User/createUser'
import ModifyUserPage from './views/User/modifyUser'
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom"
import {
    Collapse,
    Navbar as NavbarBootstrap,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import Alert from 'react-s-alert';
import 'regenerator-runtime/runtime';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-utilities/bootstrap-utilities.css';
import 'react-s-alert/dist/s-alert-default.css';

let Fragment = React.Fragment

class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return(
            <HashRouter>
                <Fragment>
                    <Alert/>
                    <NavbarBootstrap color="light" light expand="md">
                        <NavbarBrand href="/">GO CRUD</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/users">Users</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/user">Create Users</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </NavbarBootstrap>
                    <section className="container py-5">
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/users" component={UsersPage} />
                        <Route exact path="/user" component={CreateUserPage} />
                        <Route exact path="/user/:userID" component={ModifyUserPage} />
                    </section>
                </Fragment>
            </HashRouter>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('main')
)