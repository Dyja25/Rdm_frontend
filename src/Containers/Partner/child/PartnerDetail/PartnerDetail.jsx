import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getPartnerDetailsById } from "../../PartnerAction";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import PartnerDetailRight from "./PartnerDetailRight.jsx";
import PartnerDetailLeft from "./PartnerDetailLeft.jsx";
import PartnerDetailHeader from "./PartnerDetailHeader.jsx";

function PartnerDetail (props) {
   const { partnerId } = useParams();
  // componentDidMount() {
  //   this.props.getPartnerDetailsById(this.props.match.params.partnerId);
  // }
  useEffect(() => {
      props.getPartnerDetailsById(partnerId);
    }, []);

    const { partner, fetchingPartnerDetailsById } = props;
    return (
      <>
        <>
          <PartnerDetailHeader />
          {fetchingPartnerDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "25%" }}>
                    <PartnerDetailLeft partner={partner} />
                  </div>
                  <div style={{ width: "75%" }}>
                    <PartnerDetailRight partner={partner} />
                  </div>
                </FlexContainer>
              </Suspense>
            </FlexContainer>
          )}
        </>
      </>
    );

}
const mapStateToProps = ({ partner }) => ({
  fetchingPartnerDetailsById: partner.fetchingPartnerDetailsById,
  partner: partner.partner,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPartnerDetailsById,
    },
    dispatch
  );

export default (
  connect(mapStateToProps, mapDispatchToProps)(PartnerDetail)
);
