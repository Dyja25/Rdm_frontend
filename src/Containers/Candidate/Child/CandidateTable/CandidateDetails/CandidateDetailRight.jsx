import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const CandidateDetailTab = lazy(() =>
  import("./CandidateDetailTab/CandidateDetailTab.jsx")
);

class CandidateDetailRight extends Component {
  render() {
    console.log(this.props.candidateId);
    return (
      <div style={{ width: "100%" }}>
        <CandidateDetailTab candidate={this.props.candidateId} />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateDetailRight);
