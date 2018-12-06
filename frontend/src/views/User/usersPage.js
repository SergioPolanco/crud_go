import React, { Component } from 'react'
import { Table} from 'reactstrap'
import Axios from 'axios'
import Alert from 'react-s-alert'
let Fragment = React.Fragment

class UsersPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.getUsers()
    }
    getUsers = async () => {
        let response = null
        try {
            response = await Axios.get('http://localhost:1323/users')
            this.setState({
                users: response.data
            })
        } catch (error) {
            Alert.error('Error', {
                position: 'bottom-right',
                effect: 'bouncyflip',
                timeout: 'none'
            })
        }
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
                    <a className='btn btn-primary' href={`/#/user/${user.userId}`}>
                        Edit
                    </a>    
                </td>
            </tr>
        )
    }
    renderRows = () => {
        return this.state.users ? this.state.users.map((x) => this.userRow(x)) : void 0
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

export default UsersPage