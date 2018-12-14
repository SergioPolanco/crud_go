import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import Axios from 'axios'
import Alert from 'react-s-alert'

class CreateUserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isAdmin: false,
            password: '',
            confirmPassword: '',
            errorsFeeback: {}
        }
    }
    onChangeUsernameInput = (e) => {
        let value = e.target.value
        this.setState({
            userName: value
        })
    }
    onChangeFirstNameInput = (e) => {
        let value = e.target.value
        this.setState({
            firstName: value
        })
    }
    onChangeLastNameInput = (e) => {
        let value = e.target.value
        this.setState({
            lastName: value
        })
    }
    onChangeEmailInput = (e) => {
        let value = e.target.value
        this.setState({
            email: value
        })
    }
    onChangePhoneInput = (e) => {
        let value = e.target.value
        this.setState({
            phone: value
        })
    }
    onChangeIsAdminInput = (e) => {
        let value = e.target.checked
        this.setState({
            isAdmin: value
        })
    }
    onChangePasswordInput = (e) => {
        let value = e.target.value
        this.setState({
            password: value
        })
    }
    onChangeConfirmPasswordInput = (e) => {
        let value = e.target.value
        this.setState({
            confirmPassword: value
        })
    }
    handleOnSubmit = async (e) => {
        e.preventDefault()
        let data = {
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            isAdmin: this.state.isAdmin
        }
        let response = null
        try {
            const requestOptions = {
                method: 'POST',
                url: 'http://localhost:1323/user',
                data
            }
            
            response = await Axios(requestOptions)
            Alert.info(
                // eslint-disable-next-line max-len
                `The user ${response.data.firstName} ${response.data.lastName} was been saved correctly`,
                {
                    position: 'bottom-right',
                    timeout: 'none'
                }
            )
        } catch (error) {
            if (!error.response.data.Message) {
                this.setState({
                    errorsFeeback: error.response.data
                })
            } else {
                Alert.error(
                    error.response.data.Message,
                    {
                        position: 'bottom-right',
                        timeout: 'none'
                    }
                )
            }
        }
    }
    render() {
        return (
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
                    <Label for="exampleEmail">First Name</Label>
                    <Input
                        invalid={this.state.errorsFeeback.firstName ? true: false}
                        onChange={this.onChangeFirstNameInput}
                        type="text"
                        id="first_name"
                        placeholder="Type your First Name"
                    />
                    <FormFeedback id="feedback_first_name">
                        {this.state.errorsFeeback.firstName}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input
                        invalid={this.state.errorsFeeback.lastName ? true: false}
                        onChange={this.onChangeLastNameInput}
                        type="text"
                        id="last_name"
                        placeholder="Type your Last Name"
                    />
                    <FormFeedback id="feedback_last_name">
                        {this.state.errorsFeeback.lastName}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        invalid={this.state.errorsFeeback.email ? true: false}
                        onChange={this.onChangeEmailInput}
                        type="email"
                        id="email"
                        placeholder="Type your Email"
                    />
                    <FormFeedback id="feedback_email">
                        {this.state.errorsFeeback.email}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="Phone">Phone</Label>
                    <Input
                        invalid={this.state.errorsFeeback.phone ? true: false}
                        onChange={this.onChangePhoneInput}
                        type="text"
                        id="phone"
                        placeholder="####-####"
                    />
                    <FormFeedback id="feedback_phone">
                        {this.state.errorsFeeback.phone}
                    </FormFeedback>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input onChange={this.onChangeIsAdminInput} type="checkbox" />
                        Is admin
                    </Label>
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
                <FormGroup>
                    <Label for="confirm_password">Confirm Password</Label>
                    <Input
                        onChange={this.onChangeConfirmPasswordInput}
                        type="password"
                        id="confirm_password"
                        placeholder="**********"
                    />
                    <FormFeedback id="feedback_confirm_password"></FormFeedback>
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        )
    }
}

export default CreateUserPage