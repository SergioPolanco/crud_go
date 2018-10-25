import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import Axios from 'axios'
import uuid from 'uuid'
import Alert from 'react-s-alert';

let Fragment = React.Fragment

class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        e.preventDefault();
        let data = {
            userId: uuid(),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            isAdmin: this.state.isAdmin
        }
        let response = null
        try {
            response = await Axios.post('http://localhost:1323/user', data)
            console.log(response)
            Alert.info(`The user ${response.data.firstName} ${response.data.lastName} was been saved correctly`, {
                position: 'bottom-right',
                effect: 'bouncyflip',
                timeout: 'none'
            });
        } catch (error) {
            if (error.response) {
                this.setState({
                    errorsFeeback: error.response.data
                })
            }
        }
    }
    render() {
        return (
            <Form onSubmit={this.handleOnSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">First Name</Label>
                    <Input invalid={this.state.errorsFeeback.firstName ? true: false} onChange={this.onChangeFirstNameInput}type="text" id="first_name" placeholder="Type your First Name"/>
                    <FormFeedback id="feedback_first_name">{this.state.errorsFeeback.firstName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input invalid={this.state.errorsFeeback.lastName ? true: false} onChange={this.onChangeLastNameInput} type="text" id="last_name" placeholder="Type your Last Name" />
                    <FormFeedback id="feedback_last_name">{this.state.errorsFeeback.lastName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input invalid={this.state.errorsFeeback.email ? true: false} onChange={this.onChangeEmailInput} type="email" id="email" placeholder="Type your Email" />
                    <FormFeedback id="feedback_email">{this.state.errorsFeeback.email}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="Phone">Phone</Label>
                    <Input invalid={this.state.errorsFeeback.phone ? true: false} onChange={this.onChangePhoneInput} type="text" id="phone" placeholder="####-####" />
                    <FormFeedback id="feedback_phone">{this.state.errorsFeeback.phone}</FormFeedback>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input onChange={this.onChangeIsAdminInput} type="checkbox" />{' '}
                        Is admin
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input invalid={this.state.errorsFeeback.password ? true: false} onChange={this.onChangePasswordInput} type="password" id="password" placeholder="**********" />
                    <FormFeedback id="feedback_password">{this.state.errorsFeeback.password}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="confirm_password">Confirm Password</Label>
                    <Input onChange={this.onChangeConfirmPasswordInput} type="password" id="confirm_password" placeholder="**********" />
                    <FormFeedback id="feedback_confirm_password"></FormFeedback>
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        )
    }
}

export default CreateUserPage