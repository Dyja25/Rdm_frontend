import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip, Icon } from "antd";
import { ViewEditCard, Title } from "../../../../Components/UI/Elements";
// import {
//   addTopicByOrganizationId,
//   getTopicsByOrganizationId,
//   deleteTopicByOrganizationId,
// } from "../../../Team/TeamAction";
class OrganizationTopicOfInterest extends React.Component {
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
      user: { organizationId },
      topicsByOrganizationId,
      addTopicByOrganizationId,
    } = this.props;
    if (inputValue) {
      addTopicByOrganizationId({
        title: inputValue,
        description: "",
        association: {
          organizationId: organizationId,
        },
      });
    }
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
  };
  handleTopicDelete = ({ topicId, organizationId }) => {
    const { deleteTopicByOrganizationId } = this.props;
    deleteTopicByOrganizationId(topicId, organizationId);
  };

  saveInputRef = (input) => (this.input = input);

  componentDidMount = () => {
    this.props.getTopicsByOrganizationId(this.props.user.organizationId);
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingTopicsByOrganizationId,
      fetchingTopicsByOrganizationIdError,
      topicsByOrganizationId,
    } = this.props;
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: 50 }}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Topics of interest{" "}
              </Title>
              {fetchingTopicsByOrganizationId ? (
                <p>fetching topics ...</p>
              ) : (
                topicsByOrganizationId &&
                topicsByOrganizationId.map((topic, index) => {
                  console.log(topic);
                  const isLongTopic = topic.title.length >= 20;
                  const topicElem = (
                    <Tag
                      key={topic.topicId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.title.slice(0, 20)}...`
                        : topic.title}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip title={topic.title} key={topic.topicId}>
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
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <Icon type="plus" /> Topic
                </Tag>
              )}
            </div>
          ) : null
        }
      </ViewEditCard>
    );
  }
}

const mapStateToProps = ({ auth, team }) => ({
  user: auth.userDetails,
  fetchingTopicsByOrganizationId: team.fetchingTopicsByOrganizationId,
  fetchingTopicsByOrganizationIdError: team.fetchingTopicsByOrganizationIdError,
  topicsByOrganizationId: team.topicsByOrganizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByOrganizationId,
      addTopicByOrganizationId,
      deleteTopicByOrganizationId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationTopicOfInterest);
