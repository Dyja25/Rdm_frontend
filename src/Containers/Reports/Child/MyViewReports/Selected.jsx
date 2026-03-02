import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { Empty, Button, Tooltip } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { StyledTable } from "../../../../Components/UI/Antd";
import {
  HeaderText,
  Spacer,
  SubTitle,
} from "../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../Components/Placeholder";
// import { getAllLatestContacts } from "../../../Contact/ContactAction";
import { myViewReport,getSalesReports } from "../../ReportAction";
import styled from "styled-components";

class Selected extends React.Component {
  constructor() {
    super();

    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    this.state = {
      date: date,
    };
  }
  componentDidMount() {

    if(this.props.role==="USER"&&this.props.user.department==="Recruiter"){
      const { myViewReport, recruiterId, startDate, endDate } = this.props;
    myViewReport(recruiterId,"selected", startDate, endDate); 
        
    }else{
      const { getSalesReports, userId, startDate, endDate } = this.props;
      getSalesReports(userId, "selected", startDate, endDate);
     
    } 
  
    // const { myViewReport, userId, startDate, endDate } = this.props;
    // myViewReport(userId, "Recruitment", startDate, endDate);

    }
  componentWillReceiveProps(nextProps) {
    if ( 
      
       this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate
    ) {
      
      if(this.props.role==="USER"&&this.props.user.department==="Recruiter"){
        const { myViewReport, recruiterId, startDate, endDate } = nextProps;
      myViewReport(recruiterId,"selected", startDate, endDate); 
          
      }else{
        const { getSalesReports, userId, startDate, endDate } = nextProps;
        getSalesReports(userId, "selected", startDate, endDate);
       
      } 
    }
   
  }
  render() {
    const { myViewReportData, fetchingMyViewReport } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Requirement",
        dataIndex: "requirementName",
      },
      {
        title: "Job Id",
        dataIndex: "jobOrder",
      },
      {
        title: "Created On ",
        dataIndex: "creationDate",
        render: (text, item) => {
          const endDate = dayjs(item.creationDate).format("ll");
          return <span>{endDate}</span>;
        },
      },
      {
        title: "Start Date",
        dataIndex: "avilableDate",
      },
      {
        title: "Sponsor",
        dataIndex: "sponserName",
      },
      {
        title: "Skill Set",
        dataIndex: "skillName",
        //   defaultSortOrder: "descend",
        //   sorter: (a, b) => a.designation - b.designation,
      },
      {
        title: "Submitted",
        dataIndex: "offered",
      },
      {
        title: "Selected",
        dataIndex: "closedPosition",
      },
      {
        title: "Onboarded",
        dataIndex: "onBoardNo",
      },
    ];
    if (fetchingMyViewReport) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight - 100;
    return (
      <FlexContainer>
        <PDFPreviewTable>
          <StyledTable
            // rowSelection={rowSelection}
             rowKey="recruitmentId"
            columns={columns}
            // Loading={fetchingAllLatestContacts}
            dataSource={
              this.props.user.department === "Recruiter"
              ? myViewReportData
              : this.props.reportsSales
            }
            onChange={this.onChange}
            locale={{
              emptyText: (
                <Empty description={"We couldn't find relevant data"} />
              ),
            }}
            pagination={false}
            scroll={{ y: tableHeight }}
          />
          <Spacer />
          <FlexContainer
            justifyContent="flex-end"
            style={{ padding: "0em 1.25em" }}
          >
            <Tooltip title={"Generate PDF"}>
              <Button
                icon="file-pdf"
                style={{
                  color: "white",

                  border: "0.125em solid red",
                  fontSize: "1.125em",
                  backgroundColor: "red",
                  padding: "0.125em",
                }}
              ></Button>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip title={"Generate XL"}>
              <Button
                icon="file-excel"
                // type="primary"
                href={`${base_url}/excel/export/user/${this.props.userId
                  }?type=${"expense"}&startDate=${this.props.startDate}&endDate=${this.props.endDate
                  }=${this.props.userId}
                `}
                style={{
                  color: "white",
                  border: "0.125em solid green",
                  fontSize: "1.125em",
                  // padding: "0.4375em",
                  backgroundColor: "green",
                }}
              ></Button>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip title={"Generate CSV"}>
              <Button
                icon="file-text"
                target="blank"
                style={{
                  color: "white",
                  border: "0.125em solid green",
                  fontSize: "1.125em",
                  // padding: "0.4375em",
                  backgroundColor: "blue",
                }}
              ></Button>
            </Tooltip>
          </FlexContainer>
        </PDFPreviewTable>
      </FlexContainer>
    );
  }
}
const mapStateToProps = ({ auth, report, contact, dashboard }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  recruiterId:auth.userDetails.userId,
  userId: auth.userDetails.userId,
  fetchingMyViewReport: report.fetchingMyViewReport,
  fetchingSalesReports: report.fetchingSalesReports,
  startDate: report.startDate,
  myViewReportData: report.myViewReportData,
  reportsSales:report.reportsSales,
  endDate: report.endDate,
  myViewReportSelectedData: report.myViewReportSelectedData,
  selectedReportsSales:report.selectedReportsSales,
  fetchingMyViewReportSelected: report.fetchingMyViewReportSelected,
  fetchingSalesSelectedReports: report.fetchingSalesSelectedReports,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      myViewReport,
      getSalesReports
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Selected);
const PDFPreviewTable = styled.div`
  width: 100%;
`;
