import React, { Component } from "react";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import { StyledTable } from "../../../../../../../Components/UI/Antd";
import { getRemark ,handleUpdateRemarkModal,setEditRemark} from "../../../../../OpportunityAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UpdateRemarkModal from "../../Recruitment/child/UpdateRemarkModal.jsx"

import { FormattedMessage } from "react-intl";
import { EditOutlined } from "@ant-design/icons";

class RemarksTable extends Component {
  componentDidMount() {
     this.props.getRemark(this.props.profileId);
  }
  render() {
    const columns = [
      {
        // title:"Date",
         title: <FormattedMessage
                  id="app.date"
                  defaultMessage="Date"
                />,
        dataIndex: "creationDate",
        render: (text, item) => {
          const availableDate = dayjs(item.creationDate).format("ll");
          return <>
          {/* {item.availableDate === null ? "No Data" : */}
            <span>
              {dayjs(item.creationDate).format("l")}
            </span>
          {/* } */}
        </>
        },
      },
      {
        //title: "Stage",
        title: <FormattedMessage
          id="app.stage"
          defaultMessage="Stage"
        />,
        dataIndex: "stageName",
        sorter: (a, b) => {
          const stageA = a.stageA && a.stageA.toLowerCase();
          const stageB = b.stageB && a.stageB.toLowerCase();
          if (stageA < stageB) {
            return -1;
          }
          if (stageA > stageB) {
            return 1;
          }
          return 0;
        },
      },
      {
        //title: "Reviewer",
        title: <FormattedMessage
          id="app.reviewer"
          defaultMessage="Reviewer"
        />,
        dataIndex: "reviewer",
        sorter: (a, b) => {
          const reviewerA = a.reviewerA && a.reviewerA.toLowerCase();
          const reviewerB = b.reviewerB && a.reviewerB.toLowerCase();
          if (reviewerA < reviewerB) {
            return -1;
          }
          if (reviewerA > reviewerB) {
            return 1;
          }
          return 0;
        },
      },
    
      {
        //title: "Comments",
        title: <FormattedMessage
          id="app.comments"
          defaultMessage="Comments"
        />,
        dataIndex: "note",
        sorter: (a, b) => {
          const commentsA = a.commentsA && a.commentsA.toLowerCase();
          const commentsB = b.commentsB && a.commentsB.toLowerCase();
          if (commentsA < commentsB) {
            return -1;
          }
          if (commentsA > commentsB) {
            return 1;
          }
          return 0;
        },
      },

      {
        // title: "Posted By",
         title: <FormattedMessage
          id="app.postedBy"
          defaultMessage="Posted By"
        />,
        dataIndex: "ownerName",
        width: "10%",
        
        },
        {
          title: "",
          dataIndex: "documentId",
          width: "2%",
          render: (name, item, documentId,i) => {
            // documentId &&
            // documentId.map((documentId) => (
            //   <a className="documentId" href>
            //     {documentId}
            //   </a>
            // ));
          
            return (
              // <Tooltip title="Edit">
              <Tooltip
              title={
                <FormattedMessage
                  id="app.edit"
                  defaultMessage="Edit"
                />
              }
            >
              
                <EditOutlined
                  type="edit"
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    this.props.setEditRemark(item);
                    this.props.handleUpdateRemarkModal(true);
                   
                  }}
                />
                  <UpdateRemarkModal
           stageList={this.props.stageList}
           recruitment_stage_note_id={item.recruitment_stage_note_id}
        
        updateRemarkModal={this.props.updateRemarkModal}
        handleUpdateRemarkModal={this.props.handleUpdateRemarkModal}
        // handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />
              
              </Tooltip>
            );
          },
          // className: "documentId",
        },
    ];
    // if (this.props.fetchingRemark) {
    //   return <BundleLoader />;
    // }
    return (
      <>
        <StyledTable
          columns={columns}
           dataSource={this.props.remark}
          scroll={{ y: 100 }}
          // pagination={{
          //   defaultPageSize: 15,
          //   showSizeChanger: true,
          //   pageSizeOptions: ["15", "25", "40", "50"],
          // }}
          pagination={false}
        />
       
      </>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({
   fetchingRemark: opportunity.fetchingRemark,
   remark: opportunity.remark,
   updateRemarkModal:opportunity.updateRemarkModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
     getRemark,
     setEditRemark,
     handleUpdateRemarkModal
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RemarksTable);
