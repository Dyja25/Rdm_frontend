import React, { Component } from "react";
import PropTypes from "prop-types";

class CurrencySymbol extends Component {
  render() {
    const { currencyType } = this.props;
    return (
      <>
        {currencyType === "USD" && (
          <span style={{ fontSize: "0.875em" }}>&#36;</span>
        )}
        {currencyType === "EUR" && (
          <span style={{ fontSize: "0.875em" }}>&euro;</span>
        )}
        {currencyType === "GBP" && (
          <span style={{ fontSize: "0.875em" }}>&#163;</span>
        )}
        {currencyType === "INR" && (
          <span style={{ fontSize: "0.875em" }}>&#x20b9; </span>
        )}
        {currencyType === "AUD" && (
          <span style={{ fontSize: "0.875em" }}>&#36; </span>
        )}
        {currencyType === "CAD" && (
          <span style={{ fontSize: "0.875em" }}>&#36; </span>
        )}
        {currencyType === "SGD" && (
          <span style={{ fontSize: "0.875em" }}>&#36; </span>
        )}
         {currencyType === "ETB" && (
          <span style={{ fontSize: "0.875em" }}>ብር</span>
        )}
      </>
    );
  }
}
CurrencySymbol.propTypes = {
  currencyType: PropTypes.string.isRequired,
};
export default CurrencySymbol;
