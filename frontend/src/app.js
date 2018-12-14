import React from 'react'
import { Route, Link as NavLink } from 'react-router-dom'
import {
    Collapse,
    Navbar as NavbarBootstrap,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap'
import Alert from 'react-s-alert'
import HomePage from './views/homePage'
import {LoginPage} from './views/login/loginPage'
import {UsersPage} from './views/User/usersPage'
import CreateUserPage from './views/User/createUser'
import ModifyUserPage from './views/User/modifyUser'
import { PrivateRoute } from './components/privateRoute'

let Fragment = React.Fragment

class App extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return(
            <Fragment>
                <Alert/>
                <NavbarBootstrap color="light" light expand="md">
                    <NavbarBrand href="/">GO CRUD</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/users">
                                    Users
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/user">
                                    Create Users
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </NavbarBootstrap>
                <section className="container py-5">
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/users" component={UsersPage} />
                    <PrivateRoute exact path="/user" component={CreateUserPage} />
                    <Route exact path="/user/:userID" component={ModifyUserPage} />
                </section>
            </Fragment>
        )
    }
}

export default App