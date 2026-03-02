import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { Tooltip } from "antd";

import { FlexContainer } from "../../../../../../Components/UI/Layout";

class RecruitmentStages extends Component {
  // componentDidMount() {
  //   const { getStages } = this.props;
  //   getStages();
  // }
  handleStageClick = (stageId) => {
    this.props.stageClick(stageId);
  };

  render() {
  
    const { rec } = this.props;
if (!rec || !rec.stageList) return null; // prevent crash

    const index =
      rec.stageList &&
      rec.stageList
        .sort((a, b) =>
          Number(a.probability) > Number(b.probability)
            ? 1
            : Number(b.probability) > Number(a.probability)
            ? -1
            : 0
        )
        .findIndex((stage) => stage.stageId === this.props.stageId);

    return (
      <FlexContainer justifyContent="space-between">
        {" "}
        {rec.stageList
          .filter((item) => item.probability !== 0 && item.probability !== 100)
          .map((item, i) => {
            // let backgroundColor =
            //   index >= i ? `rgba(3, 89, 30, 0.${i + 1})` : "lightgray";
            return (
              <div
                style={{
                  cursor:
                    this.props.approveInd || this.props.rejectInd
                      ? "not-allowed"
                      : this.props.contactName
                      ? "pointer"
                      : "not-allowed",
                }}
                onClick={() =>
                  this.props.approveInd || this.props.rejectInd
                    ? null
                    : this.props.contactName
                    ? this.handleStageClick(item.stageId)
                    : null
                }
              >
                <Tooltip title={item.stageName}>
                  <svg
                    width="21"
                    height="17"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <title>background</title>
                      <rect
                        fill="#fff"
                        id="canvas_background"
                        height="19"
                        width="23"
                        y="-1"
                        x="-1"
                      />
                      <g
                        display="none"
                        overflow="visible"
                        y="0"
                        x="0"
                        height="100%"
                        width="100%"
                        id="canvasGrid"
                      >
                        <rect
                          fill="url(#gridpattern)"
                          stroke-width="0"
                          y="0"
                          x="0"
                          height="100%"
                          width="100%"
                        />
                      </g>
                    </g>
                    <g>
                      <title></title>
                      <path
                        stroke="#5f5f5c"
                        id="svg_1"
                        d="m0.74999,0.75001l14.25,0l4.75001,7.49998l-4.75001,7.50001l-14.25,0l4.75001,-7.50001l-4.75001,-7.49998z"
                        stroke-width="0.5"
                        fill={
                          item.stageId === rec.stageId
                            ? "rgba(3, 89, 30, 0.6)"
                            : "lightgrey"
                        }
                      />
                    </g>
                  </svg>
                  {/* <svg
                    width="22"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <title>background</title>
                      <rect
                        fill="#fff"
                        id="canvas_background"
                        height="18"
                        width="24"
                        y="-1"
                        x="-1"
                      />
                      <g
                        display="none"
                        overflow="visible"
                        y="0"
                        x="0"
                        height="100%"
                        width="100%"
                        id="canvasGrid"
                      >
                        <rect
                          fill="url(#gridpattern)"
                          stroke-width="0"
                          y="0"
                          x="0"
                          height="100%"
                          width="100%"
                        />
                      </g>
                    </g>
                    <g>
                  
                      <path
                        id="svg_1"
                        d="m1,0.99999l22.5,0l7.50001,12.99998l-7.50001,13.00004l-22.5,0l7.50001,-13.00004l-7.50001,-12.99998z"
                        stroke-width="0.5"
                        stroke="#000"
                        fill={
                          item.stageId === rec.stageId
                            ? "rgba(3, 89, 30, 0.6)"
                            : "lightgrey"
                        }
                      />
                    </g>
                  </svg> */}
                </Tooltip>
              </div>
            );
          })}
      </FlexContainer>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, account }) => ({
  // user: auth.userDetails,
  // fetchingStages: opportunity.fetchingStages,
  // stages: opportunity.stages,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getStages,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentStages);
