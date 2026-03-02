import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip } from "antd";
import { ViewEditCard, Title } from "../../../../../../Components/UI/Elements";
import {
  addTopicByCandidateId,
  getTopicsByCandidateId,
  deleteTopicByCandidateId,
} from "../../../../CandidateAction";
import { PlusOutlined } from "@ant-design/icons";
class CandidateTopicOfInterest extends React.Component {
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

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const {
      candidateId,

      addTopicByCandidateId,
    } = this.props;
    if (inputValue) {
      addTopicByCandidateId(
        {
          candidateId: this.props.candidate.candidateId,
          skillName:inputValue.charAt(0).toUpperCase() +inputValue.substr(1),
        },
        this.props.candidate.candidateId
      );
    }
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
  };
  handleTopicDelete = ({ skillSetDetailsId, candidateId }) => {
    const { deleteTopicByCandidateId } = this.props;
    deleteTopicByCandidateId(skillSetDetailsId, candidateId);
  };

  saveInputRef = (input) => (this.input = input);
  componentDidMount = () => {
     this.props.getTopicsByCandidateId(this.props.candidate.candidateId);
  };

  render() {
    console.log(this.props.candidate.candidateId)

    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingTopicsByCandidateId,
      fetchingTopicsByCandidateIdError,
      topicsByCandidateId,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: "8em" }}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Skills of interest{" "}
              </Title>
              {fetchingTopicsByCandidateId ? (
                <p>fetching Skills ...</p>
              ) : (
                topicsByCandidateId &&
                topicsByCandidateId.map((topic, index) => {
                  console.log(topic);
                  
                  const isLongTopic = topic.skillName===null?[]:topic.skillName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.skillSetDetailsId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.skillName===null?[]:topic.skillName.slice(0, 30)}...`
                        : topic.skillName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.skillName}
                      key={topic.skillSetDetailsId}
                    >
                      {topicElem}
                    </Tooltip>
                  ) : (
                    topicElem
                  );
                })
              )}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78,textTransform: "capitalize" }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  visible={this.props.topicsByCandidateId.length !== 30}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <PlusOutlined
                  type="plus" /> Skill
                </Tag>
              )}
            </div>
          ) : null
        }
      </ViewEditCard>
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
      addTopicByCandidateId,
      deleteTopicByCandidateId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateTopicOfInterest);

