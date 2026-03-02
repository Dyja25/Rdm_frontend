import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip } from "antd";
import { ViewEditCard, Title } from "../../../../../../../../Components/UI/Elements";
import axios from "axios";
import {
  getTopicsByCandidateId,
// addCatagoryByContactId,
//   // deleteCategoryByContactId,
 } from "../../../../../../../Candidate/CandidateAction";
 import RecruiterWordcloud from "./RecruiterWordcloud"
import { MainWrapper } from "../../../../../../../../Components/UI/Layout";
class CandidateCatagory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: "",
    };
  }

  showInput = () =>
    this.setState({ inputVisible: true }, () => this.input.focus());

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });

  // handleInputConfirm = () => {
  //   const { inputValue } = this.state;
  //   const {
  //     candidateId,

  //     addTopicByCandidateId,
  //   } = this.props;
  //   if (inputValue) {
  //     addTopicByCandidateId(
  //       {
  //         candidateId: this.props.candidate.candidateId,
  //         skillName:inputValue.charAt(0).toUpperCase() +inputValue.substr(1),
  //       },
  //       this.props.candidate.candidateId
  //     );
  //   }
  //   this.setState({
  //     inputVisible: false,
  //     inputValue: "",
  //   });
  // };
  // handleTopicDelete = ({ skillSetDetailsId, candidateId }) => {
  //   const { deleteTopicByCandidateId } = this.props;
  //   deleteTopicByCandidateId(skillSetDetailsId, candidateId);
  // };

  saveInputRef = (input) => (this.input = input);
  // componentDidMount = () => {
  //    this.props.getTopicsByCandidateId(this.props.candidate.candidateId);
  // };

  render() {
    console.log(this.props.candidate.candidateId)

    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingTopicsByCandidateId,
      fetchingTopicsByCandidateIdError,
      topicsByCandidateId,
    } = this.props;
    return (
      <MainWrapper>
        {/* {({ viewType }, toggleViewType) =>
          viewType === "view" ? ( */}
            <div style={{ height: "8em" }}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Skills of interest{" "}
              </Title>
             <RecruiterWordcloud
             topicsByCandidateId={this.props.topicsByCandidateId}
             />
                  
              
                  
            </div>
          {/* ) : null */}
      
          </MainWrapper>
    );
  }
}

const mapStateToProps = ({ candidate, auth }) => ({
  user: auth.userDetails,
  fetchingTopicsByCandidateId: candidate.fetchingTopicsByCandidateId,
  fetchingTopicsByCandidateIdError: candidate.fetchingTopicsByCandidateIdError,
  topicsByCandidateId: candidate.topicsByCandidateId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByCandidateId,
      // addTopicByCandidateId,
      // deleteTopicByCandidateId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateCatagory);

