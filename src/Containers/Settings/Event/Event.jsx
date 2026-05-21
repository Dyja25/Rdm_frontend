import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider, message } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleEvent from "./SingleEvent";
import {
  getEvents,
  addEvents,
  // removeEvents,
  updateEvents,
} from "./EventAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { FormattedMessage } from "react-intl";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedEvents: [],
      isTextInputOpen: false,
      addingEvent: false,
      eventType: "",
      type:"",
      singleEvent: "",
      editInd:true,
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddEvent = () => {
    const { addEvents, events } = this.props;
    const { eventType, addingEvents, isTextInputOpen,editInd } = this.state;
    let event = { eventType,editInd };

    let exist =
    events &&
    events.some((element) => element.eventType == eventType);

    if (exist) {
      message.error(
        "Can't create as another event type exists with same name!"
      );
    } else {
      addEvents(event, () => console.log("add event callback"));
    }

    this.setState({
        eventType: "",
      singleEvent: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteDesignation = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleUpdateEvent = (eventType,eventTypeId, editInd,cb) => {
    this.props.updateEvents(eventType,eventTypeId, editInd, cb);
    this.setState({ eventType: "", singleEvent: "",editInd:true });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    const { getEvents } = this.props;
    console.log();
    getEvents();
  }
  render() {
    const {
      fetchingEvents,
      fetchingEventsError,
      events,
      addingEvents,
      updatingEvents,
    } = this.props;
    const {
      isTextInputOpen,
      eventType,
      singleEvent,
      linkedEvents,
    } = this.state;
    if (fetchingEvents) return <p>Loading ...</p>;
    if (fetchingEventsError) return <p>Error ...</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <FlexContainer flexDirection="column">
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
              <MainWrapper style={{ height: "38em", marginTop: "0.625em" }}>
                {events.length &&
                  events.map((event, i) => (
                    <SingleEvent
                      key={i}
                      value={singleEvent}
                      name="singleEvent"
                      event={event}
                      linkedEvents={linkedEvents}
                      updatingEvents={updatingEvents}
                      handleChange={this.handleChange}
                      handleUpdateEvent={this.handleUpdateEvent}
                      // handleDeleteEvent={this.handleDeleteEvent}
                    />
                  ))}
              </MainWrapper>
            </FlexContainer>
            {isTextInputOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add Type"
                  name="eventType"
                  value={eventType}
                  onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!eventType}
                  Loading={addingEvents}
                  onClick={this.handleAddEvent}
                  style={{ marginRight: "0.125em" }}
                >
                 <FormattedMessage
                                                         id="app.save"
                                                         defaultMessage="Save"
                                                       />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                    <FormattedMessage
                                                          id="app.cancel"
                                                          defaultMessage="Cancel"
                                                        />
                </Button>
              </FlexContainer>
            ) : (
              <>
                <br />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    Loading={addingEvents}
                    onClick={this.toggleInput}
                  >
                   <FormattedMessage
                      id="app.addtype"
                      defaultMessage="Add Type"
                    />
                  </Button>
                </FlexContainer>
              </>
            )}
          </MainWrapper>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "100%",
                padding: "1.6rem",
                marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  addingEvents: events.addingEvents,
  addingEventsError: events.addingEventsError,
  events: events.events,

  // removingEvents: event.removingEvents,
  // removingEventsError: event.removingEventsError,
     updatingEvents: events.updatingEvents,
     updatingEventsError: events.updatingEventsError,
  fetchingEvents: events.fetchingEvents,
  fetchingEventsError: events.fetchingEventsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEvents,
      addEvents,
      // removeEvents,
       updateEvents,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Event);
