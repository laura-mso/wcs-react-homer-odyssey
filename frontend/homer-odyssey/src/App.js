import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
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
                    <Route exact path={['/', '/signin']} component={Signin} />
                    <Route path={'/signup'} component={Signup} />
                    <Route path={'/profile'} component={Profile} />
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
