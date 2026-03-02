import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const PartnerDetailTab = lazy(() =>
  import("../PartnerDetail/PartnerTab/PartnerDetailTab.jsx")
);

class PartnerDetailRight extends Component {
  render() {
    console.log(this.props.partner);
    return (
      <div style={{ width: "100%" }}>
        <PartnerDetailTab partner={this.props.partner} />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDetailRight);
