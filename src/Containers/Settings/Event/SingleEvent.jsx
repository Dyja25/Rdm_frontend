import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";


class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      eventType: "",
      editInd:true,
    };
  }
  render() {
    const {
        event: { eventType, eventTypeId },
      handleChange,
      name,
      value,
      linkedEvents,
      updatingEvents,
      handleUpdateEvent,
      handleDeleteEvent,
    } = this.props;
    console.log(linkedEvents);
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <EventWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <EventName style={{ flexBasis: "90%" }}>
                  {eventType}
                </EventName>
                <div>
                  {this.props.event.editInd?
                  <ActionIcon
                    tooltipTitle="Edit"
                    iconType="edit"
                    handleIconClick={toggleViewType}
                    size="0.75em"
                  />:null}
                  &nbsp;
                  {/* {disableDelete && <ActionIcon
                                        tooltipTitle='Delete'
                                        iconType='delete'
                                        handleIconClick={() => handleDeleteSource(documentTypeId)}
                                        size='0.75em'
                                        theme='filled'
                                        style={{ color: '#666' }}
                                    />} */}
                  {/* <ActionIcon
                    tooltipTitle="Delete"
                    iconType="delete"
                    handleIconClick={() => handleDeleteDesignation(designationTypeId)}
                    size="0.75em"
                    theme="filled"
                    style={{ color: "#666" }}
                  />*/}
                </div> 
              </FlexContainer>
            ) : (
                <FlexContainer>
                  <TextInput
                    name={name}
                    // value={value || eventType}
                    defaultValue={eventType}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!value}
                    Loading={updatingEvents}
                  onClick={() => handleUpdateEvent(eventTypeId, value, toggleViewType())}
                  >
                    {/* Save */}
                    <FormattedMessage
              id="app.update"
              defaultMessage="Update"
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
      </EventWrapper>
    );
  }
}

export default SingleEvent;

const EventWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const EventName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const EventValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
