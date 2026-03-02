import React, { Component } from "react";
import { Link } from 'react-router-dom';
class CustomerDetailView extends Component {
  render() {
    console.log("customerId", this.props.customerId);
    return (
      <>
        <Link
          to={`/customer/${this.props.customerId}`}
          >
          {this.props.name}
        </Link>
      </>
    );
  }
}
export default CustomerDetailView;
