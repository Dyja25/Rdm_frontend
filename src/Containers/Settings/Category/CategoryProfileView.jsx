import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { ViewEditCard } from "../../../Components/UI/Elements";
import { FlexContainer } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

function CategoryProfileView(props) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "1.25em",
            color: "#40A9FF",
          }}
        >
         {/* Category */}
          <FormattedMessage
          id="app.category"
          defaultMessage="Category"
        />
        </h1>
      </div>
     
      {props.rules.map((item, i) => {
        return (
          <StageWrapper>
            <ViewEditCard>
              {({ viewType }, toggleViewType) =>
                viewType === "view" ? (
                  <FlexContainer
                    justifyContent="center"
                    alignItems="center"
                    onClick={
                      () => props.handleRuleClick(item)
                    }
                    style={{
                      backgroundColor:
                        props.currentRulesOpen &&
                        props.currentRulesOpen.ruleId === item.ruleId &&
                        "rgb(161, 185, 185)",
                    }}
                  >
                    <StageName
                      style={{
                        color: "#444 "
                          ,
                        cursor:
                         "pointer",
                      }}
                    >
                      {
                        item.rulesName
                      
                      }
                    </StageName>
                  </FlexContainer>
                ) : null
              }
            </ViewEditCard>
          </StageWrapper>
        );
      })}
    </>
  );
}
const mapStateToProps = ({ auth }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryProfileView);

const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  flex-basis: 80%;
  // margin-bottom: 0;
  margin: 0;
`;
