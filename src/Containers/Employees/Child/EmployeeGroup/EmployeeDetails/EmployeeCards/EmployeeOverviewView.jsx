import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { base_url } from "../../../../../../Config/Auth";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import FormikPlacesAutoComplete from "../../../../../../Components/Forms/Formik/FormikPlacesAutoComplete";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../../Components/Utils";
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { AddressComponent } from "../../../../../../Components/Common";
// import MapPopupMarker from "../../../../../Profile/Child/ProfileCards/MapPopupMarker";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

class EmployeeOverviewView extends Component {
  render() {
    const {
      singleEmployee: { address },
      singleEmployee,
      toggleViewType,
    } = this.props;

    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "85%" }}
          >
            <div style={{ width: "20%" }}>
              <MultiAvatar
                primaryTitle={singleEmployee.firstName}
                imageId={singleEmployee.imageId}
                imageURL={singleEmployee.imageURL}
              />
            </div>
            &nbsp; &nbsp; &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "80%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >{`${singleEmployee.fullName || ""} 
                `}</Title>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer style={{ width: "15%" }} justifyContent="flex-end">
            {/* <ActionIcon
              tooltipTitle="Address"
              iconType="environment"
              handleIconClick={this.handleMapModalVisible}
              size="1em"
            />{" "}
            &nbsp; */}
            {/* <ActionIcon
              tooltipTitle="Address"
              iconType="environment"
              handleIconClick={this.handleMapModalVisible}
              size="1em"
            /> */}
            &nbsp;&nbsp;
            <Tooltip title="Edit">
  <BorderColorIcon
    fontSize="small"
    onClick={toggleViewType}
    sx={{ cursor: "pointer" }}
  />
</Tooltip>
          </FlexContainer>
        </FlexContainer>
      </>
    );
  }
}

export default EmployeeOverviewView;

class AddressField extends Component {
  render() {
    const { employeeId, addAddress, handleAddAddressVisible } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            address: {
              address1: "",
              address2: "",
              street: "",
              town: "",
              city: "",
              state: "",
              country: "",
              postalCode: "",
              latitude: "",
              longitude: "",
            },
          }}
          onSubmit={(values) => {
            console.log(values);
            const newAddress = {
              ...values.address,
              association: {
                employeeId: employeeId,
              },
            };
            console.log(newAddress);
            addAddress(newAddress);
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
              <Form className="form-background">
                <Field
                  name={`address`}
                  // label="Work place"
                  label={
                    <FormattedMessage
                      id="app.address"
                      defaultMessage="Work place"
                    />
                  }
                  component={FormikPlacesAutoComplete}
                  options={{}}
                />
                <Field
                  //label="Address1"
                  label={
                    <FormattedMessage
                      id="app.address.address1"
                      defaultMessage="Address1"
                    />
                  }
                  name="address.address1"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="address2"
                  label={
                    <FormattedMessage
                      id="app.address.address2"
                      defaultMessage="address2"
                    />
                  }
                  name="address.address2"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="street"
                  label={
                    <FormattedMessage
                      id="app.address.street"
                      defaultMessage="street"
                    />
                  }
                  name="address.street"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  // label="town"
                  label={
                    <FormattedMessage
                      id="app.address.town"
                      defaultMessage="town"
                    />
                  }
                  name="address.town"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  // label="city"
                  label={
                    <FormattedMessage
                      id="app.address.city"
                      defaultMessage="city"
                    />
                  }
                  name="address.city"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="state"
                  label={
                    <FormattedMessage
                      id="app.address.state"
                      defaultMessage="state"
                    />
                  }
                  name="address.state"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="country"
                  label={
                    <FormattedMessage
                      id="app.address.country"
                      defaultMessage="country"
                    />
                  }
                  name="address.country"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //  label="postalCode"
                  label={
                    <FormattedMessage
                      id="app.address.postalCode"
                      defaultMessage="postalCode"
                    />
                  }
                  name="address.postalCode"
                  component={InputComponent}
                // defaultValue='low'
                />

                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                <Button type="default" onClick={handleAddAddressVisible}>
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  {/* Cancel */}
                </Button>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
