import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";
import { base_url } from "../../../Config/Auth";
import { ValidationError, StyledLabel, StyledAsync } from "../../UI/Elements";
import { FlexContainer } from "../../UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setClearbitCandidateData } from "../../../Containers/Candidate/CandidateAction";

class OrderClearbit extends Component {
  // loadOptions = (name) => {
  //   if (!name) {
  //     return Promise.resolve([]);
  //   }
  //   const url = `${base_url}/candidateName/${name}`;
  //   return axios
  //     .get(url, {})
  //     .then((res) => {
  //       return res.data.map((opt) => ({
  //         label: opt.fullName,
  //         value: opt.fullName,
  //         candidateId: opt.candidateId,
  //         fullName: opt.fullName,
         
        
  //       }));
  //     })
  //     .catch((err) => console.log(err));
  // };

  loadOptions = fullName => {
    if (!fullName) {
      return Promise.resolve([]);
    }
    const url = `${base_url}/candidateName/${fullName}`;
    return axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data);
        return res.data.map(opt => ({
          label: opt.fullName,
          value: opt.candidateId,
          candidateId: opt.candidateId,
          fullName: opt.fullName,
        }));
      })
      .catch(err => console.log(err));
  };
  // renderOptions = ({ data }) => (<div><p>----{data.website}</p></div>);
  handleInputChange = (e) => e;

  handleOnChange = (option) => {
    this.props.form.setFieldValue("candidateId", option.value);
    this.props.form.setFieldValue("fullName", option.fullName);
 
  };

  handleBlur = (option) => {
    this.props.form.setFieldValue("fullName", true);
  };

  render() {
    const {
      label,
      value,
      placeholder,
      isRequired,
      inlineLabel,
      isColumn,
      isColumnWithoutNoCreate,
      form: { touched, errors, setFieldValue, setFieldTouched },
      field,
      ...rest
    } = this.props;
    if (isColumnWithoutNoCreate) {
      return (
        <>
          <StyledLabel
            style={{
              flexBasis: "20%",
              marginTop: "-49px",
              marginRight: "-48px",
            }}
          >
            {label}
          </StyledLabel>
          <StyledAsync
            isRequired={isRequired}
            backspaceRemoveValue
            formatCreateLabel={() => undefined}
            classNamePrefix="sales"
            placeholder={placeholder}
            cacheOptions
            loadOptions={this.loadOptions}
            // defaultOptions
            // value={(option) => option.fullName}
            defaultInputValue={value}
            onInputChange={this.handleInputChange}
            onBlur={this.handleBlur}
            onChange={(option) => this.handleOnChange(option)}
            styles={{ width: 600 }}

            // components={this.renderOptions}
          />

          {get(touched, field.name) && get(errors, field.name) && (
            <ValidationError>{get(errors, field.name)}</ValidationError>
          )}
        </>
      );
    }
    if (isColumn) {
      return (
        <>
          <StyledLabel
            style={{
              flexBasis: "20%",
              marginTop: "-49px",
              marginRight: "-48px",
            }}
          >
            {label}
          </StyledLabel>
          <StyledAsync
            isRequired={isRequired}
            classNamePrefix="sales"
            placeholder={placeholder}
            cacheOptions
            backspaceRemoveValue
            // value={(option) => option.fullName}
            loadOptions={this.loadOptions}
            defaultInputValue={value}
            // defaultOptions
            onInputChange={this.handleInputChange}
            onBlur={this.handleBlur}
            onChange={(option) => this.handleOnChange(option)}
            styles={{ width: 600 }}

            // components={this.renderOptions}
          />

          {get(touched, field.name) && get(errors, field.name) && (
            <ValidationError>{get(errors, field.name)}</ValidationError>
          )}
        </>
      );
    }
    return (
      <>
        <FlexContainer>
          <FlexContainer alignItems="center" flexWrap={inlineLabel && "nowrap"}>
            <StyledLabel
              style={{
                flexBasis: "20%",
                marginTop: "-49px",
                marginRight: "-48px",
              }}
            >
              {label}
            </StyledLabel>
            <StyledAsync
              isRequired={isRequired}
              classNamePrefix="sales"
              placeholder={placeholder}
              cacheOptions
              backspaceRemoveValue
              loadOptions={this.loadOptions}
              // defaultOptions
              defaultInputValue={value}
              onInputChange={this.handleInputChange}
              onBlur={this.handleBlur}
              onChange={(option) => this.handleOnChange(option)}
              styles={{ width: 600 }}

              // components={this.renderOptions}
            />
          </FlexContainer>
        </FlexContainer>
        {get(touched, field.name) && get(errors, field.name) && (
          <ValidationError>{get(errors, field.name)}</ValidationError>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setClearbitCandidateData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderClearbit);
