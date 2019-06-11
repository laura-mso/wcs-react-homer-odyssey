import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  textField: {
    margin: '10px',
    width: '80%',
  },
  button: {
    margin: theme.spacing(1),
  },
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      passwordbis: '',
      flash: 'Not connected',
      open: false,
    };
    this.updateEmailField = this.updateEmailField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  updateEmailField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  }

  handleSubmit() {
    fetch('/auth/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(
        res => this.setState({flash: res.flash}),
        err => {
          this.setState({flash: err.flash});
        },
      );
    this.setState({
      name: '',
      lastname: '',
      email: '',
      password: '',
      passwordbis: '',
      open: true,
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <div>
          <TextField
            className={classes.textField}
            onChange={this.updateEmailField}
            type='text'
            name='name'
            id='firstname'
            label='Firstname'
            value={this.state.name}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            onChange={this.updateEmailField}
            type='text'
            name='lastname'
            id='lastname'
            label='Lastname'
            value={this.state.lastname}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            onChange={this.updateEmailField}
            type='email'
            name='email'
            id='email'
            label='Email'
            value={this.state.email}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            onChange={this.updateEmailField}
            type='password'
            name='password'
            id='password1'
            label='Password'
            value={this.state.password}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            onChange={this.updateEmailField}
            type='password'
            name='passwordbis'
            id='passwordbis'
            label='Repeat password'
          />
        </div>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          onClick={this.handleSubmit}>
          Submit
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id='message-id'>{this.state.flash}</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Signup);
