import React, { Component } from 'react'
import { Table} from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAll } from '../../actions/user.actions'
let Fragment = React.Fragment

class UsersPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.props.dispatch(getAll())
    }
    userRow = (user) => {
        return(
            <tr key={user.userId}>
                <td>
                    {user.userId}
                </td>
                <td>
                    {user.firstName}
                </td>
                <td>
                    {user.lastName}
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.phone}
                </td>
                <td>
                    {user.isAdmin.toString()}
                </td>
                <td>
                    <Link className='btn btn-primary' to={`/user/${user.userId}`}>
                        Edit
                    </Link>
                </td>
            </tr>
        )
    }
    renderRows = () => {
        return this.props.users.items ?
            this.props.users.items.map((x) => this.userRow(x)) :
            void 0
    }
    render() {
        return(
            <Fragment>
                <Table
                    bordered
                    dark
                >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Is Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { users } = state
    return {
        users
    }
}

const connectedApp = connect(mapStateToProps)(UsersPage)

export { connectedApp as UsersPage }

