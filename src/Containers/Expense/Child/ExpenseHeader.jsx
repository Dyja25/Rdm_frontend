import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
// import ExpenseActionLeft from "./ExpenseActionLeft";
const ExpenseActionRight=lazy(()=> import("./ExpenseActionRight"));

class ExpenseHeader extends Component {
  render() {
    const {
      //   handleOpportunityModal,
      //   viewType,
      //   setOpportunityViewType,
    } = this.props;
    return (
      <div>
        <ActionHeader
          //   leftComponent={

          //       // <ExpenseActionLeft
          //       // //     // viewType={viewType}
          //       // //     // setMileageViewType={setMileageViewType}
          //       // //     //   department={this.props.department}
          //       // //     //   partnerLogin={this.props.partnerLogin}
          //       // />

          //   }
          rightComponent={
            <ExpenseActionRight
            //   handleOpportunityModal={handleOpportunityModal}
            />
          }
        />
      </div>
    );
  }
}

export default ExpenseHeader;
