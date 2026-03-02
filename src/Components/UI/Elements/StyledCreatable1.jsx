import Creatable from "react-select/creatable";
import styled from "styled-components";

const StyledCreatable1 = styled(Creatable).attrs((props) => ({
    styles: {
        control: (base, state) => ({
            ...base,
            flex: "1 1 0%",
            width: props.width || "auto",
            height: "1.88rem",
            minHeight: "1.35rem",
            boxShadow: props.isShadow ? "" : "0em 0.25em 0.625em -0.25em #aaa",
            borderRadius: "2px",
            // border: `0.0625em solid ${props.theme.inputBorderColor}`,
           border:"0.0625em solid #D9D9D9",
            margin: "0 0 0.42rem 0",
            padding: "0 0 0 0.7em",
            fontSize:"0.75rem",
            fontFamily:"poppins",
            backgroundColor: props.theme.backgroundColor,
            color: props.theme.color,
            outline: "none",
            "&:hover": {
                 boxShadow: " 0 0.25em 0.62em #aaa",
      border: "0.0625em solid #1890ff",
            },
        }),
        placeholder: (base) => ({
            ...base,
            color: "#bfbebb",
             fontFamily:"poppins",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            padding: "0px 5px 3px",
             fontFamily:"poppins",
        }),
        singleValue: (base) => ({
            ...base,
            color: props.theme.color,
             fontFamily:"poppins",
        }),
        menu: (base) => ({
            ...base,
            width: props.width || "100%",
            backgroundColor: "white",
            fontSize: "0.75rem",
            color: props.theme.color,
             fontFamily:"poppins",
        }),
        option: (base, { isFocused }) => ({
            ...base,
            color: isFocused ? "#222" : props.theme.color,
            backgroundColor: isFocused ? "#f0f0f0" : "white",
             fontFamily:"poppins",
        }),
    },
}))``;

export default StyledCreatable1;