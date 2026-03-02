import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import OpportunityView from "./OpportunityView.jsx";
import OpportunityEdit from "./OpportunityEdit.jsx";

class OpportunityCard extends Component {
  render() {
    const { opportunity, account, updateAccount, setAccount } = this.props;
    console.log(opportunity);
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OpportunityView
                opportunity={opportunity}
                account={account}
                toggleViewType={toggleViewType}
                updateAccount={updateAccount}
                setAccount={setAccount}
                department={this.props.department}
                partnerLogin={this.props.partnerLogin}
              />
            ) : (
              <OpportunityEdit
                opportunity={opportunity}
                toggleViewType={toggleViewType}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default OpportunityCard;
