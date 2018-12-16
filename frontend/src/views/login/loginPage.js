import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { login, logout } from '../../actions/user.actions'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errorsFeeback: {}
        }
    }

    componentDidMount = () => {
        this.props.dispatch(logout())
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state
        const { dispatch } = this.props
        if (username && password) {
            dispatch(login(username, password))
            this.props.history.push('/')
        }
        
    }
    render = () => {
        return(
            <Form onSubmit={this.handleOnSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        invalid={this.state.errorsFeeback.userName ? true: false}
                        onChange={this.handleChange}
                        name='username'
                        type="text"
                        id="username"
                        placeholder="Type your Username"
                    />
                    <FormFeedback id="feedback_username">
                        {this.state.errorsFeeback.userName}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        invalid={this.state.errorsFeeback.password ? true: false}
                        onChange={this.handleChange}
                        name='password'
                        type="password"
                        id="password"
                        placeholder="**********"
                    />
                    <FormFeedback id="feedback_password">
                        {this.state.errorsFeeback.password}
                    </FormFeedback>
                </FormGroup>

                <Button>Login</Button>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication
    return {
        loggingIn
    }
}

const connectedApp = connect(mapStateToProps)(LoginPage)

export { connectedApp as LoginPage }