import React from 'react';
import {Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: 'James',
      lastname: 'Bond',
      email: 'my@email.com',
      password: 'Passw0rd',
    };
    this.updateEmailField = this.updateEmailField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  updateEmailField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    console.log(this.state);
  }
  render() {
    return (
      <Container>
        <Form>
          <h1>{JSON.stringify(this.state, 1, 1)}</h1>
          <FormGroup>
            <Label for='firstname'>Firstname</Label>
            <Input
              onChange={this.updateEmailField}
              type='text'
              name='firstname'
              id='firstname'
              placeholder='Firstname'
            />
          </FormGroup>
          <FormGroup>
            <Label for='lastname'>Lastname</Label>
            <Input
              onChange={this.updateEmailField}
              type='text'
              name='lastname'
              id='lastname'
              placeholder='Lastname'
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              onChange={this.updateEmailField}
              type='email'
              name='email'
              id='email'
              placeholder='Email'
            />
          </FormGroup>
          <FormGroup>
            <Label for='password1'>Password</Label>
            <Input
              onChange={this.updateEmailField}
              type='password'
              name='password'
              id='password1'
              placeholder='Password'
            />
          </FormGroup>
          <FormGroup>
            <Label for='password2'>Repeat password</Label>
            <Input
              onChange={this.updateEmailField}
              type='password'
              name='password'
              id='password2'
              placeholder='Repeat password'
            />
          </FormGroup>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </Container>
    );
  }
}
