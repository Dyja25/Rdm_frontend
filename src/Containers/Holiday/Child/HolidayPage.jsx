import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addHoliday, getHoliday, updateHoliday,deleteHoliday } from "../HolidayAction";
import { FormattedMessage } from "react-intl";
import { Button,  Tooltip, message, Tag, DatePicker, Switch } from "antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { StyledModal, StyledPopconfirm } from "../../../Components/UI/Antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Spacer } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import SingleHoliday2 from "./SingleHoliday2"; 
const SingleHoliday=lazy(()=>import("./SingleHoliday"));

const TabPane = StyledTabs.TabPane;

class HolidayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextInputOpen: false,
      holidayName: "",
      holidayType: false,
      date: "",
    };
  }
  componentDidMount() {
    this.props.getHoliday();
  }
  handleChangeHolidayTime = (checked) => {
    this.setState({
      holidayType: checked,
    });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleAddProcess = () => {
    const { updateProcessName } = this.props;

    const {
      processName,

      currentProcess,
    } = this.state;
    const Id = currentProcess.processId;
    let process = { processName, processId: Id };
    updateProcessName(process, this.handleCallBack1);
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleCallBack = (status) => {
    if (status === "Success") {
      this.props.getHoliday();
    } else {
      alert("error");
    }
  };
  handleAddStage = () => {
    console.log(this.state.holidayName);
    console.log(dayjs(this.state.date).toISOString());
    console.log(this.state.holidayType ? "Optional" : "Mandatory");
    this.props.addHoliday(
      {
        holidayName: this.state.holidayName,
        date: dayjs(this.state.date).toISOString(),
        holidayType: this.state.holidayType ? "Optional" : "Mandatory",
      },
      this.handleCallBack
    );

    this.setState({
      isTextInputOpen: false,
    });
  };
  handleCancel = () => {
    console.log("cancel button");
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  };
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
    this.setState({ date: dayjs(dateString) });
  };
  handleUpdateHoliday = (id, holidayName, date, holidayType) => {
    this.props.updateHoliday(id, holidayName, date, holidayType);
  };
  handleDeleteHoliday = (id) => {
    this.props.deleteHoliday(id);
    this.setState({ holidayType: "", singleHoliday: "" });
};
  render() {
    const { isTextInputOpen } = this.state;
    const {
      userType,

    } = this.props;
    console.log(this.state.holidayName);
    return (
      <>
        <FlexContainer>
          <div style={{ width: "50%" }}>
            <MainWrapper>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "1.25em",
                  color: "white",
                  backgroundColor: "#40A9FF",
                }}
              >
                Holiday List-2022
              {/* <div
                style={{
                  marginLeft:"326px"
                }}>
                Mandatory-10
              </div> */}
              </h1>
            
              {/* <FlexContainer
                justifyContent="space-between"
                style={{ fontSize: "1.2em", fontWeight: "bold" }}
              >
                <div style={{ marginLeft: "1.4375em" }}>Name</div>
                <div style={{ marginLeft: "5.375em" }}>Date</div>
                <div style={{ marginRight: "8.4375em" }}>Type</div>
              </FlexContainer> */}



              {/* {this.props.role === "ADMIN" && (
                <div>
                {this.props.holidays.map((item, i) => (
                  <SingleHoliday
                    holidays={item}
                    newHolidayName="holidayName"
                    handleUpdateHoliday={this.handleUpdateHoliday}
                  />
                ))}
                </div>
              )}

          
              {this.props.role !== "ADMIN" && (
                <div>
                {this.props.holidays.map((item, i) => (
                  <SingleHoliday2
                    holidays={item}
                    newHolidayName="holidayName"
                    handleUpdateHoliday={this.handleUpdateHoliday}
                  />
                ))}
                </div>
              )} */}
              <div>
                {this.props.holidays.map((item, i) => (
                  <SingleHoliday
                    holidays={item}
                    newHolidayName="holidayName"
                    handleUpdateHoliday={this.handleUpdateHoliday}
                    handleDeleteHoliday={this.handleDeleteHoliday}
                  />
                ))}
              </div>

              {isTextInputOpen ? (
                <FlexContainer alignItems="left" style={{ marginTop: "2%" }}>
                  <br />
                  <TextInput
                    placeholder="Holiday name"
                    name="holidayName"
                    value={this.state.holidayName}
                    onChange={this.handleChange}
                    width={"20%"}
                  />
                  &nbsp;
                  <DatePicker onChange={this.onChangeDatePicker} />
                  &nbsp;
                  <Switch
                    style={{ width: "6.25em", marginLeft: "0.625em" }}
                    onChange={this.handleChangeHolidayTime}
                    checked={this.state.holidayType}
                    checkedChildren="Optional"
                    unCheckedChildren="Mandatory"
                  />
                  <br />
                  <FlexContainer justifyContent="flex-end" marginTop="0.625em">
                    <Button
                      type="primary"
                      htmlType="submit"
                      Loading={this.props.addingHoliday}
                      onClick={this.handleAddStage}
                    >
                      {/* Save */}
                      <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                   />
                    </Button>
                    &nbsp;
                    <Button type="primary" ghost onClick={this.handleCancel}>
                      {/* Cancel */}
                      <FormattedMessage
                 id="app.cancel"
                 defaultMessage="Cancel"
                />
                    </Button>
                  </FlexContainer>
                </FlexContainer>
              ) : (
                  <FlexContainer style={{ float: "right" }} alignItems="flex-end">
                    {this.props.role === "ADMIN" && (
                      <div style={{ marginTop: "0.3125em" }}>
                        <Button
                          style={{
                            border: "0.0625em solid #1890ff",
                            color: "#1890ff",
                          }}
                          htmlType="submit"
                          onClick={this.toggleInput}
                        >
                          {/* Add Holiday */}
                             <FormattedMessage id="app.addholiday" defaultMessage="Add Holiday"/>
                    </Button>
                    &nbsp;
                      </div>
                    )}
                  </FlexContainer>
                )}
            </MainWrapper>
          </div>
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({ holiday, auth }) => ({
  holidays: holiday.holidays,
  addingHoliday: holiday.addingHoliday,
  userType: auth.userDetails,
  deleteHoliday:holiday.deleteHoliday,
  deleteHolidayError:holiday.deleteHolidayError,
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addHoliday, getHoliday, updateHoliday,  deleteHoliday }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HolidayPage);
