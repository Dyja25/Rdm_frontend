import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { EditOutlined } from "@ant-design/icons";

class SingleLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
    };
  }
  render() {
    const {
      library: { name, definationId },
      handleChange,
      data,
      value,
      linkedLibrarys,
      updatingLibrarys,
      handleUpdateLibrary,
      handleDeletelibrary,
    } = this.props;
    console.log(linkedLibrarys);
    console.log("name", data);
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <LibraryWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <LibraryName style={{ flexBasis: "90%" }}>{name}</LibraryName>
                <div>
                  {this.props.library.editInd ? (
                       <EditOutlined
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      size="0.75em"
                    />
                  ) : null}
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
                    handleIconClick={() => handleDeleteLibrary(definationId)}
                    size="0.75em"
                    theme="filled"
                    style={{ color: "#666" }}
                  />*/}
                </div>
              </FlexContainer>
            ) : (
              <FlexContainer>
                <TextInput
                  name={data}
                  // value={value || libraryType}
                  defaultValue={name}
                  onChange={handleChange}
                  style={{ width: "61%" }}
                />
                <br />
             
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingLibrarys}
                    // disabled={!value}
                    onClick={() =>
                      handleUpdateLibrary(definationId, value, toggleViewType())
                    }
                  >
                    {/* Save */}
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </FlexContainer>
              </FlexContainer>
            )
          }
        </ViewEditCard>
      </LibraryWrapper>
    );
  }
}

export default SingleLibrary;

const LibraryWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const LibraryName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const LibraryValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
