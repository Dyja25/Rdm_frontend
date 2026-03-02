import Creatable from "react-select/creatable";
import styled from "styled-components";

const StyledCreatable = styled(Creatable).attrs((props) => ({
    styles: {
        control: (base, state) => ({
            ...base,
            flex: "1 1 0%",
            width: props.width || "auto",
            height: "1.88rem",
            minHeight: "1.35rem",
            boxShadow: props.isShadow ? "" : "0em 0.25em 0.625em -0.25em #aaa",
            borderRadius: "2px",
            border: `0.0625em solid ${props.theme.inputBorderColor}`,
            backgroundColor: props.theme.backgroundColor,
            color: props.theme.color,
            outline: "none",
            "&:hover": {
                borderColor: "#d9d9d9",
            },
        }),
        placeholder: (base) => ({
            ...base,
            color: "#bfbebb",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            padding: "0px 5px 3px",
        }),
        singleValue: (base) => ({
            ...base,
            color: props.theme.color,
        }),
        menu: (base) => ({
            ...base,
            width: props.width || "100%",
            backgroundColor: "white",
            fontSize: "0.75rem",
            color: props.theme.color,
        }),
        option: (base, { isFocused }) => ({
            ...base,
            color: isFocused ? "#222" : props.theme.color,
            backgroundColor: isFocused ? "#f0f0f0" : "white",
        }),
    },
}))``;

export default StyledCreatable;
