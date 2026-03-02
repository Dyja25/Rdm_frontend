import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import OpportunityDeletedTable from "./Child/OpportunityTable/OpportunityDeletedTable.jsx";
import {
  handleOpportunityModal,
  getOpportunityListByUserId,
  setOpportunityViewType,

} from "./OpportunityAction";

const OpportunityCardView = lazy(() => import("./OpportunityCardView.jsx"));
const OpportunityHeader = lazy(() => import("./Child/OpportunityHeader.jsx"));
const AddOpportunityModal = lazy(() => import("./Child/AddOpportunityModal.jsx"));
const OpportunityTable = lazy(() => import("./Child/OpportunityTable/OpportunityTable.jsx"));
class Opportunity extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getOpportunityListByUserId(this.props.userId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  render() {
    const {
      addOpportunityModal,
      handleOpportunityModal,
    } = this.props;
    return (
      <React.Fragment>
        <OpportunityHeader
          viewType={this.props.viewType}
          setOpportunityViewType={this.props.setOpportunityViewType}
          handleOpportunityModal={handleOpportunityModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddOpportunityModal
          addOpportunityModal={addOpportunityModal}
          handleOpportunityModal={handleOpportunityModal}
        />
        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "table" ?
          <OpportunityTable /> :
          this.props.viewType === "dashboard" ?
             <OpportunityDeletedTable/> :
             this.props.viewType === "card" ?
             <OpportunityCardView/> :
            null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  addOpportunityModal: opportunity.addOpportunityModal,
  viewType: opportunity.viewType,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleOpportunityModal,
      getOpportunityListByUserId,
      setOpportunityViewType,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
