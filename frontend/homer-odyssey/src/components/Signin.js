import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';

const styles = theme => ({
  textField: {
    margin: '10px',
    width: '80%',
  },
  button: {
    margin: theme.spacing(1),
  },
});

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      flash: 'Not connected',
      open: false,
    };
    this.updateInputField = this.updateInputField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  updateInputField(event) {
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

  handleSubmit(e) {
    e.preventDefault();
    fetch('/auth/signin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(
        res => {
          console.log('flash', res.flash);
          console.log('message', res.message);
          this.setState({flash: res.message});
        },
        err => {
          this.setState({flash: err.message});
        },
      );
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <h3>Welcome</h3>
        <div>
          <TextField
            className={classes.textField}
            onChange={this.updateInputField}
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
            onChange={this.updateInputField}
            type='password'
            name='password'
            id='password1'
            label='Password'
            value={this.state.password}
          />
        </div>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          onClick={this.handleSubmit}>
          Sign in
        </Button>
        <Link to='/signup' variant='body1'>
          {'Join us! Sign up here'}
        </Link>
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

export default withStyles(styles)(Signin);
