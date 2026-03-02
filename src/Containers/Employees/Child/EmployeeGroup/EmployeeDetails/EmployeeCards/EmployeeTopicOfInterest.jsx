import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Input, Tooltip } from "antd";
import { ViewEditCard, Title } from "../../../../../../Components/UI/Elements";
import {
  addTopicByUserId,
  getTopicsByUserId,
  deleteTopicByUserId,
} from "../../../../../Profile/ProfileAction";
class EmployeeTopicOfInterest extends React.Component {
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
      singleEmployee: { employeeId },

      addTopicByUserId,
    } = this.props;
    if (inputValue) {
      addTopicByUserId(
        {
          employeeId: employeeId,
          keySkillsName: inputValue,
        },
        employeeId
      );
    }
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
  };
  handleTopicDelete = ({ keySkillsId, employeeId }) => {
    const { deleteTopicByUserId } = this.props;
    deleteTopicByUserId(keySkillsId, employeeId);
  };

  saveInputRef = (input) => (this.input = input);

  componentDidMount = () => {
    console.log(this.props.singleEmployee.employeeId);
    this.props.getTopicsByUserId(this.props.singleEmployee.employeeId);
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const {
      fetchingTopicsByUserId,
      fetchingTopicsByUserIdError,
      topicsByUserId,
    } = this.props;
    console.log(topicsByUserId);
    return (
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <div style={{ height: 50 }}>
              <Title
                fontSize="0.875em"
                style={{ fontWeight: 600, marginBottom: "0.2rem" }}
              >
                Skills of interest{" "}
              </Title>
              {fetchingTopicsByUserId ? (
                <p>fetching Skills ...</p>
              ) : (
                topicsByUserId &&
                topicsByUserId.map((topic, index) => {
                  console.log(topic);
                  const isLongTopic = topic.keySkillsName.length >= 30;
                  const topicElem = (
                    <Tag
                      key={topic.keySkillsId}
                      color="blue"
                      closable
                      onClose={() => this.handleTopicDelete(topic)}
                      style={{ marginBottom: "0.4rem" }}
                    >
                      {isLongTopic
                        ? `${topic.keySkillsName.slice(0, 30)}...`
                        : topic.keySkillsName}
                    </Tag>
                  );
                  return isLongTopic ? (
                    <Tooltip
                      title={topic.keySkillsName}
                      key={topic.keySkillsId}
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
                  visible={this.props.topicsByUserId.length !== 30}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  {/* <Icon type="plus" /> */}
                  
                   Skill
                </Tag>
              )}
            </div>
          ) : null
        }
      </ViewEditCard>
    );
  }
}

const mapStateToProps = ({ employee, profile }) => ({
  singleEmployee: employee.singleEmployee,
  fetchingTopicsByUserId: profile.fetchingTopicsByUserId,
  fetchingTopicsByUserIdError: profile.fetchingTopicsByUserIdError,
  topicsByUserId: profile.topicsByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTopicsByUserId,
      addTopicByUserId,
      deleteTopicByUserId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeTopicOfInterest);
