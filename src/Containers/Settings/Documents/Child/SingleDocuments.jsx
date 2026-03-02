import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import { ActionIcon } from "../../../../Components/Utils";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
class SingleDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentTypeName: "",
      
    };
  }
  render() {
    const {
      document: { documentTypeName, documentTypeId },
      handleChange,
      name,
      value,
      linkedDocuments,
      updatingDocuments,
      handleUpdateDocument,
      handleDeleteDocument,
    } = this.props;
    console.log(linkedDocuments);
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <DocumentWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <DocumentName style={{ flexBasis: "90%" }}>
                  {documentTypeName}
                </DocumentName>
                <div>
                  {this.props.document.editInd?
                  <ActionIcon
                    tooltipTitle="Edit"
                    iconType="edit"
                    handleIconClick={toggleViewType}
                    size="0.75em"
                  />
                  :null}
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
                    handleIconClick={() => handleDeleteDocument(documentTypeId)}
                    size="0.75em"
                    theme="filled"
                    style={{ color: "#666" }}
                  /> */}
                </div>
              </FlexContainer>
            ) : (
                <FlexContainer>
                  <TextInput
                    name={name}
                    // value={value || documentTypeName}
                    defaultValue={documentTypeName}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDocuments}
                    disabled={!value}
                  onClick={() => handleUpdateDocument(documentTypeId, value, toggleViewType())}
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
      </DocumentWrapper>
    );
  }
}

export default SingleDocuments;

const DocumentWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const DocumentName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DocumentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
