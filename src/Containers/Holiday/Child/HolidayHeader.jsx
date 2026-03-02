import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
// import EmployeesActionLeft from "./EmployeesActionLeft";
const HolidayActionRight=lazy(()=>import("./HolidayActionRight"));

class HolidayHeader extends Component {
  render() {
    const {
      handleHolidayModal,
      //   handleOpportunityModal,
      //   viewType,
      //   setOpportunityViewType,
    } = this.props;
    return (
      <>
        <div>
          <ActionHeader
          // leftComponent={
          //     <EmployeesActionLeft
          //     //     // viewType={viewType}
          //     //     // setEmployeesViewType={setEmployeesViewType}
          //     //     //   department={this.props.department}
          //     //     //   partnerLogin={this.props.partnerLogin}
          //     />
          // }
          // rightComponent={

          // <HolidayActionRight
          //     handleHolidayModal={handleHolidayModal}
          // />

          // }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default HolidayHeader;
