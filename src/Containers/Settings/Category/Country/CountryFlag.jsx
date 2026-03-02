import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const CountryFlag = ({ countryCode }) => {
  if (!countryCode || countryCode.length !== 2) {
    return <span>Invalid Country Code</span>;
  }

  return <ReactCountryFlag countryCode={countryCode} svg />;
};

export default CountryFlag;