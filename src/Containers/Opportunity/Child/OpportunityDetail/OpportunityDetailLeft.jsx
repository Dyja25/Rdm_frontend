import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { FlexContainer } from "../../../../Components/UI/Layout";
import OpportunityCard from "./OpportunityCards/OpportunityCard.jsx";

const OpportunityDetailTab = lazy(() =>
  import("./OpportunityTab/OpportunityDetailTab.jsx")
);




class OpportunityDetailLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      account: {},
      isError: false,
    };
  }
  //update account to empty on detach
  // updateAccount = (account) => this.setState({ account: account });

  //call Account on link call back successfull
  // setAccount = (accountId) => {
  //   this.setState({ isFetching: true });
  //   axios
  //     .get(`${base_url}/account/${accountId}`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ isFetching: false, account: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState({ isFetching: false });
  //     });
  // };

  // componentDidMount() {
  //   const {
  //     opportunity: { accountId },
  //   } = this.props;
  //   if (accountId) {
  //     this.setState({ isFetching: true });
  //     axios
  //       .get(`${base_url}/account/${accountId}`, {
  //         headers: {
  //           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         this.setState({ isFetching: false, account: res.data });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         this.setState({ isFetching: false });
  //       });
  //   }
  // }

  render() {
    const {
      user: {
        metaData: { productStatus },
      },
      opportunity,
    } = this.props;
    const { account } = this.state;
    console.log(opportunity);
    return (
      <FlexContainer flexDirection="" style={{ display: "block" }}>
        <div>
        <OpportunityCard
          opportunity={opportunity}
          account={account}
          updateAccount={this.updateAccount}
          setAccount={this.setAccount}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
        />
        </div>
        {/* <div>
         <OpportunityAboutCard
          opportunity={opportunity}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
          tradeCurrency={this.props.tradeCurrency}
        />
        </div> */}
        {/* <div>
         <OpportunityAboutViewCard
          opportunity={opportunity}
          
        />
        </div> */}
        
        
          <div style={{ width: "97em" }}>
         <OpportunityDetailTab
          />
          </div>

       
       
        {/* <OpportunityProductCard opportunity={opportunity} /> */}

        {/* <OpportunityDeviationChart opportunity={opportunity} /> */}
       </FlexContainer>
    );
  }
}
const mapStateToProps = ({ opportunity, account, auth }) => ({
  // opportunity: opportunity.opportunity,
  // fetchingAccountById: account.fetchingAccountById,
  // account: account.account,
  user: auth.userDetails,
  // department: auth.userDetails && auth.userDetails.department,
  // partnerLogin: auth.user && auth.userDetails.partnerLogin,
  // tradeCurrency: auth.userDetails.tradeCurrency,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAccountById,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailLeft);
