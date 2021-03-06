import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { register } from '../../../actions/auth';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import propTypes from 'prop-types';

class Register extends Component {

  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator(
      {
        element: message =>
          <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
            {message}
          </div>
      }
    );
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangelast = this.onChangelast.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.Onchangepassword = this.Onchangepassword.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onChangefirstname = this.onChangefirstname.bind(this);
    this.Onsubmit = this.Onsubmit.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this)
    this.onChangeRole1 = this.onChangeRole1.bind(this)
    this.onchangeBornplace = this.onchangeBornplace.bind(this)
    this.state = {
      username: '',
      email: '',
      password: '',
      phonenumber: '',
      firstname: '',
      lastname: '',
      borndate: '',
      bornplace: '',
      role: '',
      isSignedUp: false
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  Onchangepassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangephone(e) {
    this.setState({
      phonenumber: e.target.value
    });
  }
  onChangefirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }
  onChangelast(e) {
    this.setState({
      lastname: e.target.value
    });
  }
  onChangeDate(e) {
    this.setState({
      borndate: e.target.value
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value = "Teacher"
    })
  }
  onChangeRole1(e) {
    this.setState({
      role: e.target.value = "Student"
    })
  }
  onchangeBornplace(e) {
    this.setState({
      bornplace: e.target.value
    })
  }
  Onsubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      Firstname: this.state.firstname,
      Lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      username: this.state.username,
      borndate: this.state.borndate,
      role: this.state.role,
      bornplace: this.state.bornplace

    };
    axios.post('http://localhost:5000/users/register', user)
      .then(res => {
        if (res.status === 200 && this.validator.allValid()) {
          this.setState({ isSignedUp: true })
        }

      }).catch(this.validator.showMessages(), this.forceUpdate());


  }
  render() {


    if (this.state.isSignedUp) {
      // redirect to dashbord if signed up
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.Onsubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="FirstName" autoComplete="Firstname" value={this.state.firstname} onChange={this.onChangefirstname} />

                    </InputGroup>
                    {this.validator.message('First name ', this.state.firstname, 'required')}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="LastName" autoComplete="lastname" value={this.state.lastname} onChange={this.onChangelast} />
                    </InputGroup>
                    {this.validator.message('Last name ', this.state.lastname, 'required')}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" value={this.state.username} onChange={this.onChangeUsername} />
                    </InputGroup>
                    {this.validator.message('username ', this.state.username, 'required|max:10')}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Phone (+216)" autoComplete="phonenumber" value={this.state.phonenumber} onChange={this.onChangephone} />
                    </InputGroup>
                    {this.validator.message('phone number ', this.state.phonenumber, 'required|numeric|min:0,num')}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" value={this.state.email} onChange={this.onChangeEmail} />
                    </InputGroup>
                    {this.validator.message('email', this.state.email, 'required|email')}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Col xs="12" md="10">
                        <Input type="date" id="date-input" name="date-input" placeholder="Born Date" value={this.state.borndate}
                          onChange={this.onChangeDate} />
                      </Col>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="Text" placeholder="Born Place" autoComplete="Born Place" value={this.state.bornplace} onChange={this.onchangeBornplace} />
                    </InputGroup>
                    {this.validator.message('Born Place', this.state.bornplace, 'required|min:4|max:16')}

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" value={this.state.password} onChange={this.Onchangepassword} />
                    </InputGroup>
                    {this.validator.message('Password', this.state.password, 'required|min:8|max:16')}

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="Teacher" onChange={this.onChangeRole} />
                      <Label className="form-check-label" check htmlFor="inline-radio1">Teacher</Label>

                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="Student" onChange={this.onChangeRole1} />
                      <Label className="form-check-label" check htmlFor="inline-radio2">Student</Label>

                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired
}
export default connect(null, { setAlert, register })(Register);
