import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import ProfileJumpStart from "../../../../Users/Child/TeamDrawer/ProfileJumpStart";

class ProfileBoost extends Component {
  onclick = () => {
    alert("hello");
  };
  render() {
    const {
      user,
      user: { metaData, userType },
    } = this.props;
    console.log(user);
    return (
      <div>
        {/* <ProfileJumpStart user={user} /> */}

        {/* <MainWrapper
          style={{
            marginTop: 30,
            padding: 10,
            marginLeft: "0.5rem",
            marginRight: "0.5rem"
          }} */}

        {/* <FlexContainer
            flexWrap="nowrap"
            style={{ marginBottom: 10, marginLeft: 10 }}
          >
            <SubTitle fontSize="1.125em" style={{ flexBasis: "30%" }}>
              <Icon
                type="thunderbolt"
                style={{ color: "red", fontSize: "1.125em" }}
              />
              {" Boost " || ""}
            </SubTitle>
            &nbsp;&nbsp;

            <Switch
              style={{ marginLeft: "28.75em" }}
              checked={metaData && metaData.smartBoost}

              disabled={metaData && metaData.smartBoost}
              checkedChildren="Yes"
              unCheckedChildren="No"

              Loading={enableSmartBoostRequest || disableSmartBoostRequest}
            />

            &nbsp;&nbsp;&nbsp;

          </FlexContainer> */}
        {/* <SubTitle
            whiteSpace="wrap"
            style={{
              fontSize: 12,
              marginLeft: 10,
              marginTop: 10,
              color: "#035b9b"
            }}
          >
           Provides actionable insights using in built algorithms. Get relevant information from multiple channels for an improved success rate.
          </SubTitle> */}

        {/* </MainWrapper> */}

        {/* <MainWrapper
          style={{
            marginTop: 10,
            padding: 10,
            marginLeft: "0.5rem",
            marginRight: "0.5rem"
          }}
        >
          <FlexContainer
            flexWrap="nowrap"
            style={{ marginBottom: 10, marginLeft: 10 }}
          >
            <SubTitle fontSize="1.125em" style={{ flexBasis: "30%" }}>
              <Icon
                type="shopping"
                style={{ color: "red", fontSize: "1.125em" }}
              />
              {" QuotPro  " || ""}
            </SubTitle>
            &nbsp;&nbsp;


            <Switch
              style={{ marginLeft: "28.75em" }}
              checked={metaData && metaData.productStatus}

              disabled={metaData && metaData.productStatus}
              checkedChildren="Yes"
              unCheckedChildren="No"
              Loading={enableProductRequest || disableProductRequest}
            />
            &nbsp;&nbsp;&nbsp;

          </FlexContainer>
          <SubTitle
            whiteSpace="wrap"
            style={{
              fontSize: 12,
              marginLeft: 10,
              marginTop: 10,
              color: "#035b9b"
            }}
          >
            Include both products and services to build a comprehensive
            quotation for your customer. Centralized product master with
            multiple currency support.
          </SubTitle>

          <SubTitle style={{ fontSize: 12, marginLeft: 10, color: "#035b9b" }}>
            {this.lastDayFromStartDate}
          </SubTitle>


        </MainWrapper> */}
        {/* {userType === "ADMIN" && (
          <MainWrapper
            style={{
              marginTop: 10,
              padding: 10,
              marginLeft: "0.5rem",
              marginRight: "0.5rem"
            }}
          >
            <FlexContainer
              flexWrap="nowrap"
              style={{ marginBottom: 10, marginLeft: 10 }}
            >
              <SubTitle fontSize="1.125em" style={{ flexBasis: "30%" }}>
                <Icon type="eye" style={{ color: "red", fontSize: "1.125em" }} />
                {" Viewport  " || ""}
              </SubTitle>
              &nbsp;&nbsp;

              <Switch
                style={{ marginLeft: "28.75em" }}
                checked={metaData && metaData.viewportStatus}
                disabled={metaData && metaData.viewportStatus}

                checkedChildren="Yes"
                unCheckedChildren="No"
                Loading={enableViewportRequest || disableViewportRequest}
              />

            </FlexContainer>
            <SubTitle
              whiteSpace="wrap"
              style={{
                fontSize: 12,
                marginLeft: 10,
                marginTop: 10,
                color: "#035b9b"
              }}
            >
              Enable viewport for other super user
            </SubTitle>
          </MainWrapper>
        )} */}
      </div>
    );
  }
}
const mapStateToProps = ({ auth, team, viewport }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProfileBoost);
