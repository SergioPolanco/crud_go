import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

class DropdownLogin extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let user = JSON.parse(localStorage.getItem('user'))
        let welcomeMessage = user ? `Welcome ${user.userName}` : ''
        return(
            this.props.loggedIn ?
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    {welcomeMessage}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <Link className="nav-link" to='/login'>
                            Logout
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown> :
            <NavItem>
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </NavItem>
        )
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication
    return {
        loggedIn
    }
}

const connectedApp = connect(mapStateToProps)(DropdownLogin)

export {
    connectedApp as DropdownLogin
}