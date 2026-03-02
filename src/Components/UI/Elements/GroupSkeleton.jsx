import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const GroupSkeleton = ({ height, ...rest }) => (
  <ContentLoader
    speed={1}
    width={400}
    height={100}
    viewBox="0 0 400 100"
    primaryColor="rgba(66, 134, 244, 0.2)"
    secondaryColor="rgba(32, 41, 56, 0.2)"
  >
    {/* <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> */}
    {/* <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> */}
    <rect x="5" y="8" rx="3" ry="3" width="300" height="3" />
    <rect x="5" y="16" rx="3" ry="3" width="220" height="3" />
    <rect x="5" y="24" rx="3" ry="3" width="150" height="3" />
    {/* <circle cx="20" cy="20" r="20" /> */}
  </ContentLoader>
);

const CodeSkeleton = styled(GroupSkeleton)`
  svg > rect {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
  }
`;

export default CodeSkeleton;
