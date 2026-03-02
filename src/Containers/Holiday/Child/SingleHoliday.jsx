import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Button, Tooltip, DatePicker, Switch } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Spacer } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { elipsize } from "../../../Helpers/Function/Functions";
import dayjs from "dayjs";
import { date } from "yup";

class SingleHoliday extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      currentStage: "",
      fields: {},
      date: this.props.holidays.date,
      holidayType: false,
      
    };
  }
  handleChange = ({ target: { name, value } }) => {
    debugger;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
    this.setState({ date: dayjs(dateString) });
  };
 
  handleChangeHolidayTime = (checked) => {
    console.log(checked);
    this.setState({
      holidayType: checked,
    });
  };
  render() {
    console.log(this.state.fields);
    const { holidays } = this.props;
    console.log(holidays);

    const {
      holidays: { holidayName, date, holidayType, holidayId,handleDeleteHoliday },
    } = this.props;

    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer
                justifyContent="center"
                alignItems="center"
              // onClick={() => handleStageClick(stageId, stageName)}
              // style={{
              //   backgroundColor:
              // stageId === currentStage && "rgb(161, 185, 185)",
              // }}
              >
                <StageName
                  style={{
                    flexBasis: "41%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "tomato",
                    fontWeight: "normal",
                  }}
                >
                  {elipsize(holidayName, 23)}
                </StageName>
                <StageValue
                  style={{
                    flexBasis: "18%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "tomato",
                    fontWeight: "normal",
                    marginRight: "8%",
                  }}
                >
                  {`${dayjs(date).format("ll")}`}
                </StageValue>
                <StageValue
                  style={{
                    flexBasis: "27%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "Green" : "tomato",
                    fontWeight: "normal",
                  }}
                >
                  {`${holidayType}`}
                </StageValue>
                {this.props.role === "ADMIN" && (
                  <div style={{}}>
                
                     <BorderColorIcon
              type="edit"
              style={{ cursor: "pointer" }}
              onClick={toggleViewType}
            />
                  </div>)}
                  &nbsp; &nbsp;
                  {this.props.role === "ADMIN" && (
                  <div style={{}}>
                    <DeleteOutlineIcon
                      type="delete"
                      //  onClick={() => this.props.handleDeleteHoliday(holidayId)}
                      // handleIconClick={item.holidayId}
                      onClick={() => this.props.handleDeleteHoliday(holidayId)}
                      size="0.75em"
                    />
                  </div>)}
              </FlexContainer>

            ) : (
                <FlexContainer>
                  <TextInput
                    name={this.props.newHolidayName}
                    defaultValue={holidayName}
                    onChange={this.handleChange}
                    width={"48%"}
                  />
                &nbsp;
                  <DatePicker
                    defaultValue={dayjs(date)}
                    onChange={this.onChangeDatePicker}
                  />
                &nbsp;
                  <Switch
                    style={{ width: "6.25em", marginLeft: "0.625em" }}
                    onChange={this.handleChangeHolidayTime}
                    checked={this.state.holidayType}
                    checkedChildren="Optional"
                    unCheckedChildren="Mandatory"
                  />
                  {/* <TextInput
                                        name={newProbability}
                                        defaultValue={probability}
                                        // disabled={disabled}
                                        // style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                                        onChange={this.handleChange}

                                        width={"25%"}
                                    /> */}
                &nbsp;
                  {/* <TextInput
                                        name={newDays}
                                        defaultValue={days}


                                        // style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                                        onChange={this.handleChange}
                                        placeholder="Days"
                                        width={"24%"}
                                    /> */}
                  <Spacer />
                  <Spacer style={{ marginBottom: "0.625em" }} />
                  <FlexContainer
                    justifyContent="flex-end"
                    marginRight="0.3125em"
                    marginTop="0.625em"
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      // Loading={updatingStages}

                      onClick={() =>
                        this.props.handleUpdateHoliday(
                          holidayId,
                          this.state.fields.holidayName,
                          this.state.date,
                          this.state.holidayType === true
                            ? "Optional"
                            : "Mandatory",
                          toggleViewType()
                        )
                      }
                    >
                      {/* Save */}
                      <FormattedMessage
                 id="app.save"
                 defaultMessage="Save"
                />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                      {/* Cancel */}
                      <FormattedMessage
                 id="app.cancel"
                 defaultMessage="Cancel"
                />
                  </Button>
                  </FlexContainer>
                </FlexContainer>
              )
          }
        </ViewEditCard>
      </StageWrapper>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
  
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SingleHoliday);

const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;
