import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Profile from './containers/Profile';
import requireAuth from './hoc/requireAuth';
import requireNotAuth from './hoc/requireNotAuth';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function App() {
  return (
    <MuiThemeProvider>
      <Grid container alignItems='center' style={{height: '100%'}}>
        <Grid item xs={12}>
          <Paper elevation={4} style={{margin: 32}}>
            <Grid
              container
              alignItems='center'
              alignContent='center'
              justify='center'>
              <Grid item xs={12} sm={6} style={{textAlign: 'center'}}>
                <img
                  src='http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png'
                  alt='Homer'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BrowserRouter>
                  <Switch>
                    <Redirect exact from='/' to='/profile' />
                    <Route
                      exact
                      path='/profile'
                      component={requireAuth(Profile)}
                    />
                    <Route
                      exact
                      path='/signin'
                      component={requireNotAuth(Signin)}
                    />
                    <Route
                      exact
                      path='/signup'
                      component={requireNotAuth(Signup)}
                    />
                  </Switch>
                </BrowserRouter>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
