import React, { Component, useEffect,useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import Highlighter from 'react-highlight-words';
import {getDesignations} from "../../../Settings/Designation/DesignationAction";
import {getDepartments} from "../../../Settings/Department/DepartmentAction";
import styled from "styled-components";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Button, Empty, Spin, Tooltip,Input,Popconfirm, Checkbox } from "antd";
import {
  MultiAvatar,
  Spacer,
  SubTitle,
  StyledLabel,
} from "../../../../Components/UI/Elements";

import {
  getEmployeelist,
  handleEmployeeDrawerForAdmin,
  deleteEmployeeData
} from "../../EmployeeAction";

import { BundleLoader } from "../../../../Components/Placeholder";
// import CatagoryForm from "./CatagoryForm";
import { FlexContainer } from "../../../../Components/UI/Layout";

import EmployeeDetailsView from "../EmployeeGroup/EmployeeDetails/EmployeeDetailsView";
import EmployeeDrawerForAdmin from "./EmployeeDrawer/EmployeeDrawerForAdmin";
import EmployeeType from "../SuspendEmployee/EmployeeType";
import SuspendEmployee from "../SuspendEmployee/SuspendEmployee";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined } from "@ant-design/icons";

const moduleOptions = [
  "Bank",
  "Educational",
  "Training",
  "Address",
  "Contract",
  "ContractAdress",
  "EmployeeDocument",
  "EmployeeId",
  "EmployeeInfo",
  "EmployeeNotes",
  "EmploymentHistory",
  "Keyskill",
  "Personaldetails",
  "Salarydetails",
];
function EmployeeTable(props) {
  const [page, setPage] = useState(0);
   const [selectedMap, setSelectedMap] = useState({});
   const [openRow, setOpenRow] = useState(null);

  useEffect(() => {
    props.getEmployeelist();
    props.getDesignations();
    props.getDepartments();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              // icon={<SearchOutlined />}
              icon="search"
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          
        </div>
      ),
      filterIcon: (filtered) => (
        // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        // <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        <></>
      ),
      onFilter: (value, record) =>
        record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()) : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString(): ""}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  const handleCheckboxChange = (employeeId, list) => {
    setSelectedMap((prev) => ({
      ...prev,
      [employeeId]: list,
    }));
  };

  /* check all */
  const handleCheckAll = (employeeId, e) => {
    setSelectedMap((prev) => ({
      ...prev,
      [employeeId]: e.target.checked ? [...moduleOptions] : [],
    }));
  };

  /* popup open close */
  const handlePopupChange = (visible, employeeId) => {
    if (visible) {
      setOpenRow(employeeId);

      /* reset every time popup opens */
      setSelectedMap((prev) => ({
        ...prev,
        [employeeId]: [],
      }));
    } else {
      setOpenRow(null);
    }
  };

  /* confirm delete */
  const handleDelete = (record) => {
    console.log(
      
      selectedMap[record.employeeId] || [],
    );
    props.deleteEmployeeData(record.employeeId,selectedMap[record.employeeId] || [])

    setOpenRow(null);
  };

  const popupContent = (record) => {
    const checkedValues =
      selectedMap[record.employeeId] || [];

    const checkAll =
      checkedValues.length === moduleOptions.length;

    const indeterminate =
      checkedValues.length > 0 &&
      checkedValues.length < moduleOptions.length;

    return (
      <div className="w-[420px]">
        {/* check all */}
        <div className="border-b pb-2 mb-3">
          <Checkbox
            checked={checkAll}
            indeterminate={indeterminate}
            onChange={(e) =>
              handleCheckAll(record.employeeId, e)
            }
          >
            Check All
          </Checkbox>
        </div>

        {/* side by side */}
        <Checkbox.Group
          value={checkedValues}
          onChange={(list) =>
            handleCheckboxChange(
              record.employeeId,
              list
            )
          }
          className="grid grid-cols-2 gap-y-2"
        >
          {moduleOptions.map((item) => (
            <Checkbox key={item} value={item}>
              {item}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>
    );
  };

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const departmentNameOption = useMemo(() => {
    if (!props.departments) return [];
    return (
      props.departments.length &&
      props.departments.map((departments) => {
        return {
          text: departments.departmentName || "",
          value: departments.departmentName,
        };
      })
    );
  }, [props.departments]);

  const designationTypeOption = useMemo(() => {
    if (!props.designations) return [];
    return (
      props.designations.length &&
      props.designations.map((designations) => {
        return {
          text: designations.designationType || "",
          value: designations.designationType,
        };
      })
    );
  }, [props.designations]);

  const {
    fetchingEmployee,
    fetchingEmployeeError,
    employees,
    handleEmployeeDrawerForAdmin,
    employeeDrawerVisibleForAdmin,
  } = props;
  const { imgRadius } = props;
  const columns = [
    {
      title: "",
      width: "2%",
    },

    {
      //title: "Name",
      title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      width: "15%",
      dataIndex:"fullName",
     ...getColumnSearchProps('fullName'),
       render: (employeeId, item, i) => (
        <EmployeeDetailsView
          employeeId={item.employeeId}
          fullName={item.fullName}
          // firstName={item.firstName || ""}
          // middleName={item.middleName || ""}
          // lastName={item.lastName || ""}
        />
      ),
    },
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    {
      //title: "Department",
      title: (
        <FormattedMessage id="app.department" defaultMessage="Department" />
      ),
      width: "10%",
      dataIndex: "department",
      filters:departmentNameOption,
      onFilter: (value, record) => {
        return record.department === value;
      },
    },

    {
      //title: "Designation",
      title: (
        <FormattedMessage id="app.designation" defaultMessage="Designation" />
      ),
      dataIndex: "designation",
      width: "12%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.designation - b.designation,
      filters:designationTypeOption,
      
      onFilter: (value, record) => {
        return record.designation === value;
      },
    },
   
    {
      // title: "Mobile #",
      title: <FormattedMessage id="app.mobile" defaultMessage="Mobile #" />,
      dataIndex: "mobileNo",
      width: "13%",
      render: (name, item, i) => {
        return (
          <span>
            {item.countryDialCode} {item.mobileNo}
          </span>
        );
      },
    },
    {
      //title: "Email #",
      title: <FormattedMessage id="app.email" defaultMessage="Email #" />,
      dataIndex: "emailId",
      width: "18%",
    },
    {
      title: <FormattedMessage id="app.skills" defaultMessage="Skills" />,
      dataIndex: "skills",
      ...getColumnSearchProps('skills'),
      width: "15%", 
      render: (name, item, i) => {
        return (
          // <span>{item.skill && item.skill[0].skillName}</span>
          //   <>
          //   <SkillsForm topics={item.skill} />
          // </>
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {item.skill && item.skill.map((option, i) => {
                return (

                  <div key={i} style={{
                    border: "2px solid rgb(125 241 193)",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}>
                    {option.keySkillsName}
                  </div>

                );
              })}
            </div>
          </>
        );
      }
    },
    {
      // title: "Type",
      title: <FormattedMessage id="app.type" defaultMessage="Type" />,
      width: "5%",
      render: (name, item, i) => {
        return (
          <>
            <EmployeeType
              // partnerId={item.partnerId}
              // suspendInd={item.suspendInd}
              // assignedIndicator={item.assignedInd}
              employeeId={item.employeeId}
            />
          </>
        );
      },
    },
    {
      // title: "Suspend",
       title: <FormattedMessage id="app.suspend" defaultMessage="Suspend" />,
      width: "5%",
      

      render: (name, item, i) => {
        return (
          <>
            <SuspendEmployee
              partnerId={item.partnerId}
              suspendInd={item.suspendInd}
              assignedIndicator={item.assignedInd}
              employeeId={item.employeeId}
            />
          </>
        );
      },
    },
    
    {
      title: "",
      render: (name, item, i) => {
        return (
          <>
            {item.role === "ADMIN" ? (
              <Tooltip placement="right" title="Control Tower">
                <Button
                  size={"small"}
                  type="ghost"
                  style={{
                    color: "#888",
                    borderColor: "transparent",
                    alignSelf: "flex-end",
                  }}
                  onClick={() => {
                    handleEmployeeDrawerForAdmin(true);
                  }}
                >
                  <PulseIcon1></PulseIcon1>
                </Button>
              </Tooltip>
            ) : null}
          </>
        );
      },
    },
       {
      title: "",
      render: (_, record) => (
              <Popconfirm
          title="Select Delete Modules"
          description={popupContent(record)}
          icon={null}
          okText="OK"
          cancelText="Cancel"
          open={openRow === record.employeeId}
          onOpenChange={(visible) =>
            handlePopupChange(
              visible,
              record.employeeId
            )
          }
          onConfirm={() =>
            handleDelete(record)
          }
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];

  /* if (fetchingEmployeeError) {
     return <APIFailed />;
   }*/
   const tab = document.querySelector(".ant-layout-sider-children");
   const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      {/* <Spin tip="Loading..." spinning={!fetchingContactsLazyLoading}> */}
      <StyledTable
        rowKey="employeeId"
        // rowSelection={rowSelection}
        columns={columns}
        Loading={fetchingEmployee || fetchingEmployeeError}
        // scroll={{ y: 500 }}
        // pagination={false}
        scroll={{ y: tableHeight }}
       
        pagination={false}
        dataSource={employees}
        // onChange={onChange}
        // locale={{
        //   emptyText: <Empty description={"We couldn't find relevant data"} />,
        // }}
      />
      <Spacer />
      <EmployeeDrawerForAdmin
        handleEmployeeDrawerForAdmin={handleEmployeeDrawerForAdmin}
        employeeDrawerVisibleForAdmin={employeeDrawerVisibleForAdmin}
      />
    </>
  );
}
const mapStateToProps = ({ auth, employee,designations,departments }) => ({
  userId: auth.userDetails.userId,
  employees: employee.employees,
  fetchingEmployee: employee.fetchingEmployee,
  designations: designations.designations,
  departments:departments.departments,
  fetchingEmployeeError: employee.fetchingEmployeeError,
  employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmployeelist,
      handleEmployeeDrawerForAdmin,
      getDesignations,
      getDepartments,
      deleteEmployeeData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-broadcast-tower ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    background: yellow;
    color: blue;
  }
`;
