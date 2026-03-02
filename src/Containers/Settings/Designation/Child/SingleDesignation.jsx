import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import { ActionIcon } from "../../../../Components/Utils";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";


class SingleDesignation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      designationType: "",
      editInd:true
    };
  }
  render() {
    const {
      designation: { designationType, designationTypeId },
      handleChange,
      name,
      value,
      linkedDesignations,
      updatingDesignations,
      handleUpdateDesignation,
      handleDeletedesignation,
    } = this.props;
    console.log(linkedDesignations);
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <DesignationWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <DesignationName style={{ flexBasis: "90%" }}>
                  {designationType}
                </DesignationName>
                <div>
                  {this.props.designation.editInd?
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
                    // value={value || designationType}
                    defaultValue={designationType}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDesignations}
                    disabled={!value}
                  onClick={() => handleUpdateDesignation(designationTypeId, value, toggleViewType())}
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
      </DesignationWrapper>
    );
  }
}

export default SingleDesignation;

const DesignationWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const DesignationName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DesignationValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
