import React from 'react'
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { login, logout } from '../../actions/user.actions'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errorsFeeback: {}
        }
    }

    render = () => {
        return(
            <Form onSubmit={this.handleOnSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        invalid={this.state.errorsFeeback.userName ? true: false}
                        onChange={this.onChangeUsernameInput}
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
                        onChange={this.onChangePasswordInput}
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
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedApp = connect(mapStateToProps)(LoginPage);

export { connectedApp as LoginPage }; 