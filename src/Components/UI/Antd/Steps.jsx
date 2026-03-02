import { Steps } from "antd";
import styled from 'styled-components'

const StyledSteps = styled(Steps)`
    color: ${props => props.theme.color};
    
    background-color: ${props => props.theme.backgroundColor};
`
export default StyledSteps;