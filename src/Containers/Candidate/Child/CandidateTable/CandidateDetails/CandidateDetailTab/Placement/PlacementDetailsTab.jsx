import { Component,Suspense } from "react";
import { StyledTabs } from "../../../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { ActionIcon } from "../../../../../../../Components/Utils";
import { TabsWrapper } from "../../../../../../../Components/UI/Layout";
import RemarksTable from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/RemarksTable";
 import { handleRemarksModal, } from "../../../../../../Opportunity/OpportunityAction";
import AddRemarksModal from "../../../../../../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/AddRemarksModal";
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";




const TabPane = StyledTabs.TabPane;

class PlacementDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    const { 
      handleRemarksModal,
      addRemarksModal
     

    } = this.props;
    // console.log(this.props.stageList);
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span><FormattedMessage
          id="app.remarks"
          defaultMessage="Remarks"
        /></span>
                  {activeKey === "1" && (
                    <>
                     
                      
                        <PlusOutlined
                          type="plus"
                           tooltipTitle="Tag Remarks"
                           onClick={() => handleRemarksModal(true)}
                          size="0.875em"
                          style={{ marginLeft: 10, verticalAlign: "center" }}
                        />

                        <AddRemarksModal
                        addRemarksModal={addRemarksModal}
                         handleRemarksModal={handleRemarksModal}
                         stageList={this.props.stageList}
                      
                      />
                 
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                <RemarksTable 
                // profileId={this.props.profileId} 
                />
              </Suspense>
            </TabPane>

          </StyledTabs>
        </TabsWrapper>
    
      </>
    );
  }
}
const mappropsToProps = ({ opportunity,candidate }) => ({
   addRemarksModal: opportunity.addRemarksModal,
//   documentUploadModal: opportunity.documentUploadModal,
//   addCandidateEmploymentModal: candidate.addCandidateEmploymentModal,
//   addCandidateTrainingModal: candidate.addCandidateTrainingModal,
//   addCandidateEducationModal: candidate.addCandidateEducationModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       handleRemarksModal,
    //    handleDocumentUploadModal,
    //    handleCandidateEducationModal,
    //    handleCandidateTrainingModal,
    //    handleCandidateEmploymentModal,
    },
    dispatch
  );

export default connect(
  mappropsToProps,
  mapDispatchToProps
)(PlacementDetailsTab);
