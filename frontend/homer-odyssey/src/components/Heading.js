import React from 'react';
import {withRouter, Link} from 'react-router-dom';

const Header = ({location}) => (
  <header>
    HEADER {location.pathname === '/' ? 'Homepage' : 'Not Homepage'}
  </header>
);

export default withRouter(Header);
