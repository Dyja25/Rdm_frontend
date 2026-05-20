
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider,Popconfirm, message ,Input} from "antd";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, Title } from "../../../../Components/UI/Elements";
import {
  getCountry,
  allCountryMandatory
} from "./CountryAction"
import SingleCountry from "./SingleCountry";


class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingUnit: false,
      projectName: "",
      type: "",
      singleCountry: "",
      editInd:true,
      allLanguagesSelected:false,
      currentData: "",
      // selected:false,
      selected: localStorage.getItem('selected') === 'true',
    };
  }
  // handleSelectDeselect = () => {
  //   const { selected } = this.state;
  //   this.setState({ selected: !selected });
  //   this.props.allCountryMandatory(!selected);
  // };
  handleSelectDeselect = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected }, () => {
      localStorage.setItem('selected', this.state.selected);
      this.props.allCountryMandatory(this.state.selected);
    });
  };
  // handleSelectAllLanguages = () => {
  //   // this.setState({ allLanguagesSelected: event.target.checked });
  //   this.props.allCountryMandatory();
  // };

  // areAllMandatoryIndTrue = () => {
  //   return this.props.country.every(card => card.mandatoryInd === false);
  // };
  handleClear = () => {
    this.setState({ currentData: "" });
     this.props.getCountry();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

    componentDidMount() {
        const { getCountry } = this.props;
        console.log();
        getCountry(getCountry);
        // this.getLinkedSources();
      }
  render() {
    // const result1 = this.props.country.every((card) => card.mandatoryInd === false);
    // const result = this.props.country.every((card) => card.mandatoryInd === true);
    // const allMandatoryIndTrue = this.areAllMandatoryIndTrue();
    // const{allLanguagesSelected}=this.state;
    // console.log("result",result)
    // console.log("result1",result1)
    const {
        fetchingCountry,
        fetchingCountryError,
        country,
      addingProjectsData,
      updatingProjectsData,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      projectName,
      singleCountry,
      linkedTasks,
    } = this.state;
    if (fetchingCountry) return <p>Loading ...</p>;
    // if (fetchingUnitsError) return <p>We are unable to load data</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <FlexContainer flexDirection="column">
              <MainWrapper style={{ height: "38em", marginTop: "0.625em" }}>
              {/* <Popconfirm
                    title="Confirm all mandatory country change?"
                    onConfirm={() => this.handleSelectAllLanguages()}
                    // onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                > */}
  <Button 
  type="primary"
  // style={{backgroundColor:this.state.selected ?"red" :"green"}}
  onClick={this.handleSelectDeselect}>
          {this.state.selected ? 'Deselect All' : 'Select All'}
        </Button>
      {/* </Popconfirm> */}
              {/* <label>
        <input
          type="checkbox"
          checked={allLanguagesSelected}
          onChange={this.handleSelectAllLanguages}
        />
        Select All Country
      </label> */}
                {country.length &&
                  country.map((country, i) => (
                    <SingleCountry
                       key={i}
                      //  allLanguagesSelected={allLanguagesSelected}
                      //  handleSelectAllLanguages={this.handleSelectAllLanguages}
                      value={singleCountry}
                      name="singleCountry"
                      country={country}

                      handleChange={this.handleChange}
  
                    />
                   ))} 
              </MainWrapper>
            </FlexContainer>
          </MainWrapper>
         
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ countrys,auth }) => ({
    fetchingCountry:countrys.fetchingCountry,
    country:countrys.country,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCountry,
        allCountryMandatory
   
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Country);
