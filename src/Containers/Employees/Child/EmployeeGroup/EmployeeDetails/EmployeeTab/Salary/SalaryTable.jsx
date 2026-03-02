import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
// import { getEmailCredentials } from "../../../../../Settings/Email/EmailAction";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
// import { handleUpdateEmploymentModal } from "../../../../../../Profile/ProfileAction";
// import { handleEmploymentModal } from "../../../../ProfileAction";
// import AddEmploymentModal from "./AddEmploymentModal";
// import { profileReducer } from "../../../../ProfileReducer";
import {
  getSalaryDetails,
  setEditSalary,
  handleUpdateSalaryModal,
  // deleteSalaryTable,
} from "../../../../../../Profile/ProfileAction";
// import EditEmailForm from "../../../../../Settings/Email/Child/EditEmailForm"
import UpdateSalaryModal from "./UpdateSalaryModal";
import dayjs from "dayjs";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
// import { base_url } from "../../../../../../../Config/Auth";

class SalaryTable extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         educationModalVisible: false
  //         // data:this.props.processTask
  //     };
  // }
  // handleEducationModalVisible = () =>
  //     this.setState({ educationModalVisible: !this.state.educationModalVisible });

  componentDidMount() {
    const { getSalaryDetails, employeeId } = this.props;
    console.log(employeeId);
    if (employeeId) {
      getSalaryDetails(employeeId);
    }
  }

  render() {
    const {
      salaryDetails,
      handleUpdateSalaryModal,
      updateSalaryModal,
      setEditSalary,
      fetchingEmployeeSalaryDetails,
      fetchingEmployeeSalaryDetailsError,
      // deleteSalaryTable,
    } = this.props;

    // const { emailCredential, fetchingEmailCredential } = this.props;
    const columns = [
      {
        //title: "Gross Salary",
        title: <FormattedMessage
          id="app.grossMonthlySalary"
          defaultMessage="Gross Salary"
        />,
        dataIndex: "grossMonthlySalary",
        // width: "35%"
      },
      {
        // title: "Net Salary",
        title: <FormattedMessage
          id="app.netSalary"
          defaultMessage="Net Salary"
        />,
        dataIndex: "netSalary",
      },
      {
        // title: "Start Date",
        title: <FormattedMessage
          id="app.startingDate"
          defaultMessage="Start Date"
        />,
        dataIndex: "startingDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.startingDate).format("LL")}</span>;
        },
      },
      {
        //title: "End Date",
        title: <FormattedMessage
          id="app.endDate"
          defaultMessage="End Date"
        />,
        dataIndex: "endDate",
        render: (name, item, i) => {
          return <span>{item.endDate}</span>;
        },
      },

      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            // <Icon
            //   type="edit"
            //   style={{ cursor: "pointer" }}
            //   onClick={() => {
            //     //debugger
            //     // this.props.setEmail(item);
            //     setEditSalary(item);
            //     handleUpdateSalaryModal(true);
            //   }}
            // />
            <></>
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
            // onConfirm={() => deleteSalaryTable(item.id)}
            >
              {/* <Icon type="delete" style={{ cursor: "pointer", color: "red" }} /> */}
            </StyledPopconfirm>
          );
        },
      },
      //combine and show salary +curr+type
      //   {
      //     title: "Salary",
      //     render: (name, item, i) => {
      //       return (
      //         <span>{`${item.salary} ${item.currency} ${item.salaryType}`}</span>
      //       );
      //     },
      //   },

      //   {
      //     title: "Description",
      //     dataIndex: "description",
      //   },
      //   {
      //     title: "",
      //     dataIndex: "documentId",
      //     width: "9%",
      //     render: (name, item, i) => {
      //       return (
      //         <>
      //           {item.documentId ? (
      //             <a
      //               href={`${base_url}/document/${item.documentId}`}
      //               target="_blank"
      //             >
      //               <Icon
      //                 type="download"
      //                 // onClick={() => startDownload()}
      //                 style={{ cursor: "pointer" }}
      //               />
      //             </a>
      //           ) : null}
      //         </>
      //       );
      //     },
      //   },
      //   {
      //     title: "",
      //     dataIndex: "id",
      //     width: "2%",
      //     render: (name, item, i) => {
      //       return (
      //         <StyledPopconfirm
      //           title="Do you want to delete?"
      //           onConfirm={() => deleteEmploymentTable(item.id)}
      //         >
      //           <Icon type="delete" style={{ cursor: "pointer", color: "red" }} />
      //           {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
      //         </StyledPopconfirm>
      //       );
      //     },
      //   },

      //   {
      //     title: "",
      //     dataIndex: "documentId",
      //     render: (name, item, i) => {
      //       //debugger
      //       return (
      //         <Icon
      //           type="edit"
      //           style={{ cursor: "pointer" }}
      //           onClick={() => {
      //             setEditEmployment(item);
      //             handleUpdateEmploymentModal(true);
      //           }}
      //         />
      //       );
      //     },
      //   },
    ];

    if (fetchingEmployeeSalaryDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          Loading={
            fetchingEmployeeSalaryDetails || fetchingEmployeeSalaryDetailsError
          }
          dataSource={salaryDetails}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />

        <UpdateSalaryModal
          updateSalaryModal={updateSalaryModal}
          handleUpdateSalaryModal={handleUpdateSalaryModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  salaryDetails: profile.salaryDetails,
  fetchingEmployeeSalaryDetails: profile.fetchingSalaryDetails,
  fetchingEmployeeSalaryDetailsError: profile.fetchingSalaryDetailsError,
  updateSalaryModal: profile.updateSalaryModal,
  employeeId: employee.singleEmployee && employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSalaryDetails,
      setEditSalary,
      handleUpdateSalaryModal,
      // deleteSalaryTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SalaryTable);
