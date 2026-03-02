import React, { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import English from "./Language/en.json";
import Dutch from "./Language/dutch.json";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setLanguage } from "./Language/LanguageAction";

const Wrapper = (props) => {
  const [lang, setLang] = useState(English);

  useEffect(() => {
    if (props.preferedLanguage === "English") {
      setLang(English);
    } else if (props.preferedLanguage === "Dutch") {
      setLang(Dutch);
    } else {
      setLang(English);
    }
  }, [props.preferedLanguage]);

  return (
    <IntlProvider locale={props.preferedLanguage} messages={lang}>
      {props.children}
    </IntlProvider>
  );
};

const mapStateToProps = ({ language,auth }) => ({
  language: language.language,
  preferedLanguage:auth.userDetails.preferedLanguage
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setLanguage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
