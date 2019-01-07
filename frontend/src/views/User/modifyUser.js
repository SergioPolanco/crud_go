import React from 'react'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Container,
} from 'reactstrap'
import Axios from 'axios'
import Alert from 'react-s-alert'

class ModifyUserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName:'',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isAdmin: false,
            errorsFeeback: {}
        }
    }
    componentDidMount = () => {
        this.getUser()
    }
    getUser = async () => {
        let response = null
        try {
            response = await Axios.get(
                `http://localhost:1323/user/${this.props.match.params.userID}`
            )
            this.setState(response.data)
        } catch (error) {
            Alert.error(error.response.data.message, {
                position: 'bottom-right',
                timeout: 5000
            })
        }
    }

    handleOnChangeInputText = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleOnChangeInputCheckBox = (e) => {
        const { name, checked} = e.target
        this.setState({ [name]: checked })
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()
        let data = {
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            isAdmin: this.state.isAdmin
        }
        let response = null
        try {
            response = await Axios.post(
                `http://localhost:1323/user/${this.props.match.params.userID}`,
                data
            )
            Alert.info(
                // eslint-disable-next-line max-len
                `The user ${response.data.firstName} ${response.data.lastName} was been saved correctly`, 
                {
                    position: 'bottom-right',
                    effect: 'bouncyflip',
                    timeout: 'none'
                }
            )
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
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                Edit Information
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleOnSubmit}>
                                    <FormGroup>
                                        <Label for="userName">Username</Label>
                                        <Input
                                            invalid={
                                                this.state.errorsFeeback.userName ?
                                                true :
                                                false
                                            }
                                            name="userName"
                                            onChange={this.handleOnChangeInputText}
                                            type="text"
                                            id="userName"
                                            placeholder="Type your Username"
                                            defaultValue={this.state.userName}
                                        />
                                        <FormFeedback id="feedback_username">
                                            {this.state.errorsFeeback.userName}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="firstName">First Name</Label>
                                        <Input
                                            invalid={
                                                this.state.errorsFeeback.firstName ?
                                                true :
                                                false
                                            }
                                            name="firstName"
                                            onChange={this.handleOnChangeInputText}
                                            type="text"
                                            id="firstName"
                                            placeholder="Type your First Name"
                                            defaultValue={this.state.firstName}
                                        />
                                        <FormFeedback id="feedback_first_name">
                                            {this.state.errorsFeeback.firstName}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="lastName">Last Name</Label>
                                        <Input
                                            invalid={
                                                this.state.errorsFeeback.lastName ?
                                                true :
                                                false
                                            }
                                            name="lastName"
                                            onChange={this.handleOnChangeInputText}
                                            type="text"
                                            id="lastName"
                                            placeholder="Type your Last Name"
                                            defaultValue={this.state.lastName}
                                        />
                                        <FormFeedback id="feedback_last_name">
                                            {this.state.errorsFeeback.lastName}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            invalid={this.state.errorsFeeback.email ? true: false}
                                            onChange={this.handleOnChangeInputText}
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Type your Email"
                                            defaultValue={this.state.email}
                                        />
                                        <FormFeedback id="feedback_email">
                                            {this.state.errorsFeeback.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input
                                            invalid={this.state.errorsFeeback.phone ? true: false}
                                            onChange={this.handleOnChangeInputText}
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="####-####"
                                            defaultValue={this.state.phone}
                                        />
                                        <FormFeedback id="feedback_phone">
                                            {this.state.errorsFeeback.phone}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                onChange={this.handleOnChangeInputCheckBox}
                                                type="checkbox"
                                                checked={this.state.isAdmin}
                                                name="isAdmin"
                                            />
                                            Is admin
                                        </Label>
                                    </FormGroup>

                                    <Button>Save</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                Change Password
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            invalid={
                                                this.state.errorsFeeback.password ?
                                                true :
                                                false
                                            }
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

                                    <Button>Change Password</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ModifyUserPage