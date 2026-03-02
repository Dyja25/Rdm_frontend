import styled from "styled-components";

const FormContainer = styled.div`
     padding: 2rem;
    margin: 2rem;
    align-self: center;
    border-radius: 0.5rem;
    height: auto;
    width: 28.125em;
    background: linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
    transition: opacity 0.1s, -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);
    transition: opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);
    transition: opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25), -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);
    -webkit-transform: scale(1);
        transform: scale(1);
`
export default FormContainer;