import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export default function(ComposedComponent) {
  function mapStateToProps(state) {
    return {authenticated: state.auth.token ? true : false};
  }
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) this.props.history.push('/signin');
    }
    componentWillUpdate() {
      if (!this.props.authenticated) this.props.history.push('/signin');
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return withRouter(connect(mapStateToProps)(Authentication));
}
