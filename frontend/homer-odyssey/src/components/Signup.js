import React from 'react';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'E-Mail',
    };
    this.updateEmailField = this.updateEmailField.bind(this);
  }
  updateEmailField(event) {
    this.setState({
      email: event.target.value,
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.email}</h1>
        <input onChange={this.updateEmailField} type='email' name='email' />
      </div>
    );
  }
}
