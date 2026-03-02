import React, { Component, lazy, Suspense } from "react";
import { FlexContainer } from "../../Components/UI/Layout";

const PermissionsDetailsLeft = lazy(() => import("./PermissionsDetailsLeft.jsx"));
// const FeedBackDetailsRight = lazy(() => import("./FeedBackDetailsRight"));

class PermissionsDetails extends Component {
  render() {
    return (
      <>
        <FlexContainer>
          <Suspense fallback={"Loading..."}>
            <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
              <div style={{ width: "40%" }}>
                <PermissionsDetailsLeft />
              </div>
            </FlexContainer>
          </Suspense>
        </FlexContainer>
      </>
    );
  }
}

export default PermissionsDetails;
