import React, {useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox, Spacer } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import {getDateWiseList} from "../../DashboardAction";

class DashboardJumpStart extends React.Component{
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
  const { getDateWiseList, recruiterId, startDate, endDate } = this.props;
  getDateWiseList(recruiterId,  startDate, endDate);
}
componentWillReceiveProps(nextProps) {
  if (
    this.props.startDate !== nextProps.startDate ||
    this.props.endDate !== nextProps.endDate
  ) {
    const { getDateWiseList, recruiterId, startDate, endDate } = nextProps;
    getDateWiseList(recruiterId, startDate, endDate);
  }
}

//   useEffect(() => { 
//    props.getDateWiseList(props.recruiterId,props.startDate, props.endDate);
// }, [props.startDate, props.endDate, props.type]);
  
render() {
  const { showDatelist, fetchingDatewiseReport } = this.props;
  return(
      <FlexContainer flexDirection="column" style={{ width: "100%"}}>
        <FlexContainer style={{ width: "100%"}}>
        
          <JumpStartBox
            noProgress
            title="Requirements"
            // bgColor="#da5432"
            bgColor="linear-gradient(89.69deg, #F18F01 34.92%, #FF2727 99.73%)"
            value={this.props.showDatelist.openRequirement}
            isLoading={this.props.fetchingDatewiseReport}
          />
       
          <JumpStartBox
            noProgress
            title="Positions "
            bgColor="linear-gradient(270deg, #3066BE 0%, #0EB1D2 100%);"
          />
          <JumpStartBox
            noProgress
            title="Profiles Submitted"
            bgColor="linear-gradient(270.23deg, #00A843 0.19%, #1FD071 99.8%)"
            value={this.props.showDatelist.taggedProfile}
            isLoading={this.props.fetchingDatewiseReport}
          />
          <JumpStartBox
            noProgress
            title="Profiles Selected"
            bgColor="linear-gradient(269.97deg, #FFFFFF 0.02%, #000000 0.03%)"
            value={this.props.showDatelist.selectted}
            isLoading={this.props.fetchingDatewiseReport}
            
          />
          <JumpStartBox
            noProgress
            title="On Boarded"
            bgColor="linear-gradient(269.97deg, #FFFFFF 0.02%, #27175a 0.03%)"
            
            value={this.props.showDatelist.onboarded}
            isLoading={this.props.fetchingDatewiseReport}
            
          />
           
           {/* <JumpStartBox
            noProgress
            title="DashBoard6"
            bgColor="linear-gradient(269.97deg, #FFFFFF 0.02%, #000000 0.03%)"
          /> */}
          {/* <JumpStartBox
                    // jumpstartClick={
                    //   subscriptionType === "PROFESSIONALPLUS"
                    //     ? () => this.props.handleLifetimeModal(true)
                    //     : null
                    // }
                    // cursorData={
                    //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                    // }
                    noProgress
                    currencyType={currencyType}
                    title="Won"
                    bgColor="#4cc9f0"
                />
                <JumpStartBox
                    // jumpstartClick={
                    //   subscriptionType === "PROFESSIONALPLUS"
                    //     ? () => this.props.handleLifetimeModal(true)
                    //     : null
                    // }
                    // cursorData={
                    //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                    // }
                    noProgress
                    currencyType={currencyType}
                    title="Customers Added"
                    bgColor="#92defe"
                /> */}
        </FlexContainer>
        <Spacer />
        {/* <FlexContainer>
          <JumpStartBox noProgress title="All Products" bgColor="#8791a1" />
          <JumpStartBox noProgress title="Quantity On Hand" bgColor="#8791a1" />
          <JumpStartBox
            noProgress
            title="Out of Stock Products"
            bgColor="#8791a1"
          />
          <JumpStartBox noProgress title="Total Visitors" bgColor="#8791a1" />
        </FlexContainer> */}
      </FlexContainer>
    
  ); 
}
}
const mapStateToProps = ({ dashboard,auth }) => ({
  showDatelist:dashboard.showDatelist,
  fetchingDatewiseReport:dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError:dashboard.fetchingDatewiseReportError,
  recruiterId:auth.userDetails.userId,
  endDate: dashboard.endDate,
  startDate: dashboard.startDate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getDateWiseList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardJumpStart);
