import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import { ActionIcon } from "../../../../Components/Utils";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../../Components/UI/Elements";
const { Option } = Select;

class SingleRoleTalent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      roleType: "",
      departmentName: "",
      departmentId:"",
      editInd:true,
    };
  }
  render() {
    const {
        talentRole: { roleType, roleTypeId,departmentName,departmentId },
      handleChange,
      name,
      value,
      handleDepartment,
    linkedRoles,
      updatingRoles,
      handleDeleteRole,
      handleUpdateRole,
    //   handleDeleteDepartment,
    } = this.props;
     console.log(linkedRoles);
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <RoleWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <RoleType style={{ flexBasis: "43%" }}>
                  {roleType}
                </RoleType>
             
                <div>
                  {/* {this.props.role.editInd ? */}
                  <ActionIcon
                    tooltipTitle="Edit"
                    iconType="edit"
                    handleIconClick={toggleViewType}
                    size="0.75em"
                  />
                  {/* :null} */}
                  &nbsp;
                  <ActionIcon
                                  tooltipTitle="Delete"
                                 iconType="delete"
                                 handleIconClick={() => handleDeleteRole(roleTypeId)}
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
                    // value={value || departmentName}
                    defaultValue={roleType}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
             
             
                  <br />
                  <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingRoles}
                    disabled={!value}
                  onClick={() => handleUpdateRole(roleTypeId, value,departmentId,departmentName, toggleViewType())}
                  >
                    Update
            
                </Button> 
                &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                     Cancel 
            
                </Button>
                </FlexContainer>
                </FlexContainer>
              )
          }
        </ViewEditCard>
      </RoleWrapper>
    );
  }
}

export default SingleRoleTalent;

const RoleWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const RoleType = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DepartmentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
