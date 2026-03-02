import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import { ActionIcon } from "../../../Components/Utils";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../Components/UI/Elements";
import DepartmentStatusToggle from "./DepartmentStatusToggle";
const { Option } = Select;

class SingleDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      departmentName: "",
      sectorId:"",
      sectorName:"",
      editInd:true,
    };
  }

  handleSectorId = (value) =>
    this.setState({ sectorId: value });
  render() {
    const {
       department: { departmentName, departmentId,sectorId,sectorName },
      handleChange,
      name,
      value,
      linkedDepartments,
      updatingDepartments,
      handleUpdateDepartment,
      handleDeleteDepartment,

    } = this.props;
    console.log(linkedDepartments);

    console.log("35l",this.props)
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <DepartmentWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <DepartmentName style={{ flexBasis: "45%" }}>
                  {departmentName}
                </DepartmentName>
                <DepartmentName style={{ flexBasis: "42%" }}>
                  {sectorName}
                </DepartmentName>
                <div>
                <div style={{width:"35%"}}>
                    <DepartmentStatusToggle
                      //mandetoryInd={mandetoryInd}
                      departmentName={departmentName}
                      departmentId={departmentId}
                    />  
                    </div>
                  {this.props.department.editInd?
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
                    // value={value || departmentName}
                    defaultValue={departmentName}
                    onChange={handleChange}
                    style={{ width: "45%" }}
                  />
                  <Select 
              defaultValue={sectorName}
               style={{width:"30%"}}
               placeholder="Select Sectors"
               onChange={this.handleSectorId}
               >
                            {this.props.sectors.map((item) => {
                                return <Option value={item.sectorId}>{item.sectorName} </Option>;
                            })}
               </Select>
                  <br />
                  <br />
                  <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDepartments}
                    disabled={!value}
                  onClick={() => handleUpdateDepartment(departmentId,value,sectorId,sectorName,value, toggleViewType())}
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
      </DepartmentWrapper>
    );
  }
}

export default SingleDepartment;

const DepartmentWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const DepartmentName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DepartmentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
