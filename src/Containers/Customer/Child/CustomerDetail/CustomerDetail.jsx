import React, { useEffect,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import { getCustomerDetailsById } from "../../CustomerAction";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
const CustomerDetailRight=lazy(()=> import("./CustomerDetailRight.jsx"));
const CustomerDetailLeft=lazy(()=> import("./CustomerDetailLeft.jsx"));
const CustomerDetailHeader=lazy(()=> import("./CustomerDetailHeader.jsx"));

function CustomerDetail (props) {
      const { customerId } = useParams();
 

  useEffect(() => {
      props.getCustomerDetailsById(customerId);
    }, []);


    const { customer, fetchingCustomerDetailsById } = props;
    return (
      <>
        <>
          <CustomerDetailHeader />
          {fetchingCustomerDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
              <FlexContainer>
                <Suspense fallback={"Loading..."}>
                  <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                    <div style={{ width: "25%" }}>
                      <CustomerDetailLeft customer={customer} />
                    </div>
                    <div style={{ width: "75%" }}>
                      <CustomerDetailRight customer={customer} />
                    </div>
                  </FlexContainer>
                </Suspense>
              </FlexContainer>
            )}
        </>
      </>
    );
  
}
const mapStateToProps = ({ customer }) => ({
  fetchingCustomerDetailsById: customer.fetchingCustomerDetailsById,
  customer: customer.customer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerDetailsById,
    },
    dispatch
  );

export default (
  connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)
);
