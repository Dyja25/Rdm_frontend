import React from "react";
import { Code } from "react-content-loader";
import styled from "styled-components";

const Skeleton = ({ height, ...rest }) => (
  <Code
    height={height || 300}
    primaryColor="rgba(66, 134, 244, 0.2)"
    secondaryColor="rgba(32, 41, 56, 0.2)"
    {...rest}
  />
);

const CodeSkeleton = styled(Skeleton)`
  svg > rect {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
  }
`;

export default CodeSkeleton;
