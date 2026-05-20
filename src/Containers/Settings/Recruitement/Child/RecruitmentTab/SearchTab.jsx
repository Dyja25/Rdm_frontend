import React, { useEffect, useMemo, useState } from "react";
import { Button, Popconfirm, Slider, Spin, Switch,Tooltip } from "antd";
import {
  MainWrapper,
  Spacer,
  StyledLabel,
} from "../../../../../Components/UI/Elements";
import {StyledTabs} from "../../../../../Components/UI/Antd";
import { FlexContainer,TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addsQuoteProSearchTab,
  getQuoteProSearchTab,
} from "../../../../Rules/RulesAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
import SearchForm from "./SearchForm";
const TabPane = StyledTabs.TabPane;
function SeachTab(props) {
  const [availibility, setAvailibility] = useState(10);
  const [billing, setBilling] = useState(25);
  function handleAvailibilitySliderChange(value) {
    setAvailibility(value);
  }
  function handlebillingSliderChange(value) {
    setBilling(value);
  }
  console.log(availibility);
  console.log(billing);
  useEffect(() => {
    debugger;
    props.getQuoteProSearchTab(props.orgId);
    setAvailibility(props.searchTabData.avilableDate || 10);
    setBilling(props.searchTabData.billing || 25);
  }, [props.searchTabData.avilableDate, props.searchTabData.billing]);
  const lessCodeThanCheckingPrevRow = useMemo(() => {
    debugger;
    setAvailibility(props.searchTabData.avilableDate);
  }, []);
  const lessCodeThanCheckingPrevRow1 = useMemo(() => {
    debugger;
    setBilling(props.searchTabData.billing);
  }, []);
  useEffect(() => {
    debugger;
    if (props.searchTabData.avilableDate !== availibility) {
      debugger;
      setAvailibility(props.searchTabData.avilableDate);
    }
  }, [props.searchTabData]);
  useEffect(() => {
    debugger;
    if (props.searchTabData.billing !== billing) {
      debugger;
      setBilling(props.searchTabData.billing);
    }
  }, [props.searchTabData]);
  // const marks = {
  //   0: "0",
  //   10: "10",
  //   20: "20",
  //   30: {
  //     label: <strong>30 Days</strong>,
  //   },
  // };

  // const marks1 = {
  //   0: "0%",
  //   25: "25%",
  //   50: "50%",
  //   75: "75%",
  //   100: {
  //     label: <strong>100%</strong>,
  //   },
  // };

  return (
    <>
    <TabsWrapper style={{height:"90.3vh"}}>
    <StyledTabs
           // defaultActiveKey="1"
           // onChange={this.handleTabChange}
           // forceRender={true}
          >
            <TabPane
            tab={
              <>
                {/* <span onClick={this.handleRecruitClick}> */}
                {/* <FontAwesomeIcon icon={solid('envelope')} /> */}
                  <span style={{ marginLeft: '0.25em' }}>Permission</span>
                {/* </span> */}
                {/* {activeKey === "1" && (
                  
                )} */}
                <>                 
                  <Tooltip title="Permission">                   
                  </Tooltip>                 
                </>
              </>
            }
            key="1">
               <div style={{ marginTop: 10 }}>
              <SearchForm />
            </div>

            </TabPane>
      </StyledTabs> 
    </TabsWrapper>
    </>
    // <div>
    //   <MainWrapper>
    //     <div style={{ width: "50%", margin: "1.25em" }}>
    //       {props.fetchingQuoteSearchTab ? (
    //         <>
    //           <FlexContainer justifyContent="center">
    //             {" "}
    //             <Spin />
    //           </FlexContainer>
    //         </>
    //       ) : (
    //           <>
    //             <StyledLabel>Availability (Beyond Requirement Date)</StyledLabel>
    //             <Slider
    //               marks={marks}
    //               defaultValue={availibility}
    //               min={0}
    //               max={30}
    //               onChange={handleAvailibilitySliderChange}
    //             />
    //             <Spacer marginTop="3.75em" />
    //             <StyledLabel>Billing (Scope for increase)</StyledLabel>
    //             <Slider
    //               marks={marks1}
    //               defaultValue={billing}
    //               min={0}
    //               max={100}
    //               onChange={handlebillingSliderChange}
    //             />
    //           </>
    //         )}

    //       <Spacer />
    //     </div>
    //     <FlexContainer
    //       justifyContent="flex-end"
    //       style={{ marginRight: "0.625em" }}
    //     >
    //       <Popconfirm
    //         title="Do you wish to proceed?"
    //         onConfirm={() =>
    //           props.addsQuoteProSearchTab(
    //             {
    //               avilableDate: availibility,
    //               billing: billing,
    //               orgId: props.orgId,
    //             },
    //             props.orgId
    //           )
    //         }
    //         onCancel={props.getQuoteProSearchTab}
    //         okText="Ok"
    //         cancelText="Cancel"
    //       >
    //         <Button
    //           type="primary"
    //           Loading={props.addingQuoteSearchTab}
    //           htmlType="submit"
    //         >
    //           Update
    //         </Button>
    //       </Popconfirm>
    //     </FlexContainer>
    //   </MainWrapper>
    // </div>
  );
}

const mapStateToProps = ({ rule, auth }) => ({
  addingQuoteSearchTab: rule.addingQuoteSearchTab,
  addingQuoteSearchTabError: rule.addingQuoteSearchTabError,

  fetchingQuoteSearchTab: rule.fetchingQuoteSearchTab,
  fetchingQuoteSearchTabError: rule.fetchingQuoteSearchTabError,
  searchTabData: rule.searchTabData,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addsQuoteProSearchTab, 
    getQuoteProSearchTab 
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SeachTab);
