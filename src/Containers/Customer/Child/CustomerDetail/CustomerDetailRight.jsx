import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const CustomerDetailTab = lazy(() => import("./CustomerTab/CustomerDetailTab.jsx"));

class CustomerDetailRight extends Component {
  render() {
    console.log(this.props.customer);
    return (
      <div style={{ width: "100%" }}>
        <CustomerDetailTab customer={this.props.customer} />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailRight);
