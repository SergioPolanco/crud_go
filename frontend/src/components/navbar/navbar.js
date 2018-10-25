import React from 'react'
import axios from 'axios';
import {
    Collapse,
    Navbar as NavbarBootstrap,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';

let Fragment = React.Fragment;
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mensaje: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:1323/')
        .then((response) => {
            this.setState({
                mensaje: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })

    }
    render() {
        return(
            <Fragment>
                <NavbarBootstrap color="light" light expand="md">
                    <NavbarBrand href="/">GO CRUD</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Users</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">Create User</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </NavbarBootstrap>
            </Fragment>
        )
    }
}

export default Navbar