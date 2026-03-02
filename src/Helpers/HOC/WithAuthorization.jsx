import React from 'react';
import {connect } from 'react-redux';

const withAuthorization = (Component) =>
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
          <Component />
      );
    }
    
  }

export default withAuthorization;