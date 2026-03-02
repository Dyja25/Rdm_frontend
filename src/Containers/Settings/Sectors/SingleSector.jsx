import React, { Component } from "react";
import styled from "styled-components";
import { Button, Tooltip, Input } from "antd";
import EditableInput from "../../../Components/Forms/Edit/EditableInput";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { ActionIcon } from "../../../Components/Utils";
import { TextInput } from "../../../Components/UI/Elements";

import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";

class SingleSectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      sectorName: "",
      editInd: true,
    };
  }
  render() {
    const {
      sector: { sectorName, sectorId, EditInd },
      handleChange,
      name,
      value,
      linkedSectors,
      updatingSectors,
      handleUpdateSector,
      handleDeleteSector,
    } = this.props;
    console.log(linkedSectors);
    console.log("name", name);
    // const disableDelete = linkedCustomers && linkedCustomers.includes(typeId)
    return (
      <SectorWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <SectorName style={{ flexBasis: "85%" }}>
                  {sectorName}
                </SectorName>
                <div>
                                    {this.props.sector.editInd?(
                                <ActionIcon
                                tooltipTitle="Edit"
                                 iconType="edit"
                                handleIconClick={toggleViewType}
                               size="0.75em"
                               />
                                 ):null} 
                                &nbsp;
                                
                                <ActionIcon
                                  tooltipTitle="Delete"
                                 iconType="delete"
                                 handleIconClick={() => handleDeleteSector(sectorId)}
                                 size="14px"
                                 style={{
                                   verticalAlign: "center",
                                   marginLeft: "5px",
                                   color: "red",
                                 }}
                                 />
                                    
                                  
                                </div>
              </FlexContainer>
            ) : (
              <FlexContainer>
                <TextInput
                  name={name}
                  // value={value || sectorName}
                  defaultValue={sectorName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
                <br />
                <br />
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updatingSectors}
                    disabled={!value}
                    onClick={() =>
                      handleUpdateSector(sectorId, value, toggleViewType())
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
                </div>
              </FlexContainer>
            )
          }
        </ViewEditCard>
      </SectorWrapper>
    );
  }
}

export default SingleSectors;

const SectorWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const SectorName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const SectorValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
