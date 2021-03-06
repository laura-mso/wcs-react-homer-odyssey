import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    margin: '10px',
    width: '80%',
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: 'homer@simpson.de',
        name: 'Homer',
        lastname: 'Simpson',
      },
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <h3>Profile</h3>
        <List>
          <ListItem>
            <ListItemText
              primary='Name'
              secondary={
                this.state.profile.name + ' ' + this.state.profile.lastname
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='E-Mail'
              secondary={this.state.profile.email}
            />
          </ListItem>
        </List>
        <Link to='/signin'>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            onClick={this.handleSubmit}>
            Sign out
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Profile);
