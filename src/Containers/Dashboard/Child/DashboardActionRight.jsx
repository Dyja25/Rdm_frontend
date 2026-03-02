import { Popover } from "antd";
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import {
  setSelectedTimeIntervalReport,
  setTimeRangeReport,
  setSelectedReportType,
  setSubSelectedReportType,

} from "../DashboardAction";

import { bindActionCreators } from "redux";


import TimeInterval from "../../../Utils/TimeInterval";



const HeaderActionRight = (props) => {
  const {

    setSelectedTimeIntervalReport,
    dateRangeList,

  } = props;



  return (
    <>
      <FlexContainer alignItems="center">



        <TimeInterval
          times={dateRangeList}
          handleClick={setSelectedTimeIntervalReport}
        />



        <Popover>
          <StyledRangePicker
            style={{ marginLeft: 5, marginRight: 5 }}
            onChange={(range) => {
              props.setTimeRangeReport(range[0], range[1]);
              console.log(range);
            }}

          />
        </Popover>
      </FlexContainer>
    </>
  );
};


const mapStateToProps = ({ auth, dashboard }) => ({
  user: auth.user,
  userId: auth.userDetails.userId,
  dateRangeList: dashboard.dateRangeList,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedTimeIntervalReport,
      setTimeRangeReport,
      setSelectedReportType,
      setSubSelectedReportType,
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActionRight);