import React, { Component, useMemo } from "react";
import styled from "styled-components";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import CountryStatusToggle from "./CountryStatusToggle";
import { FlexContainer } from "../../../../Components/UI/Layout";
import CountryFlag from "./CountryFlag";
class SingleCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: "",
      
    };
  }
  render() {
    const {
      country: { countryName,editInd, mandatoryInd,countryAlpha2Code, countryId },
      handleChange,
      name,
      value,
      documents,
    } = this.props;
    return (
      <CountryWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div>
               <FlexContainer justifyContent="space-evenly">
                  <div style={{width:"50%"}}>
                    
                  <CountryName style={{ flexBasis: "90%" }}>
                  {/* <input
                type="checkbox"
                checked={this.props.allLanguagesSelected}
                onChange={this.props.handleSelectAllLanguages}
              /> */}
                  <CountryFlag countryCode={countryAlpha2Code} />
                  &nbsp;&nbsp;
                    {countryName}
                  </CountryName>
                  </div>
                  <div style={{width:"35%"}}>
                    <CountryStatusToggle
                  editInd={editInd}
                      mandatoryInd={mandatoryInd}
                      countryName={countryName}
                      countryId={countryId}
                    />  
                    </div>
                  
                </FlexContainer>
              </div>
            ) : (
              <FlexContainer>
                <TextInput
                  name={name}
                  defaultValue={countryName}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
              </FlexContainer>
            )
          }
        </ViewEditCard>
      </CountryWrapper>
    );
  }
}

export default SingleCountry;

const CountryWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const CountryName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const CountryValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;
