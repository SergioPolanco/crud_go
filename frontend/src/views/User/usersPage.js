import React from 'react'
import { Table } from 'reactstrap';
import Axios from 'axios';
let Fragment = React.Fragment

class UsersPage extends React.Component {
    componentDidMount() {
        Axios.get('http://localhost:1323/users')
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
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
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </Fragment>
        )
    }
}

export default UsersPage