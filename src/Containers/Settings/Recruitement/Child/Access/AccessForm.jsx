import { Button, Checkbox, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { BundleLoader } from "../../../../../Components/Placeholder";
import { bindActionCreators } from 'redux';
import { Spacer } from '../../../../../Components/UI/Elements';
import { FlexContainer, TabsWrapper } from "../../../../../Components/UI/Layout";
import { getDepartmentAccess, addDepartmentAccess } from "../../../SettingsAction"

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Access', 'Create', 'Update', 'Delete'];
const defaultCheckedList = ['Apple', 'Orange'];

const AccessForm = (props) => {

  useEffect(() => {
    console.log(props.departmentId)
    props.getDepartmentAccess(props.departmentId)
  }, [props.departmentId])
  useEffect(() => {
    setCheckedVendorList(props.departmentAcces.vendor)
    setCheckedCustomerList(props.departmentAcces.customer)
    setCheckedOpportunityList(props.departmentAcces.opportunity)
    setCheckedTalentList(props.departmentAcces.talent)
    setCheckedContactList(props.departmentAcces.contact)
    setCheckedRequirementList(props.departmentAcces.requirement)
    setCheckedPublishList(props.departmentAcces.publish)
    setCheckedPulseList(props.departmentAcces.pulse)
  }, [props.departmentAcces.vendor,
  props.departmentAcces.customer,
  props.departmentAcces.opportunity,
  props.departmentAcces.contact,
  props.departmentAcces.requirement,
  props.departmentAcces.publish,
  props.departmentAcces.pulse,
  props.departmentAcces.talent])
  //Vendor
  const [checkedVendorList, setCheckedVendorList] = useState(props.departmentAcces.vendor);
  const [indeterminateVendor, setIndeterminateVendor] = useState(true);
  const [checkAllVendor, setCheckAllVendor] = useState(false);

  const onVendorChange = (list) => {
    setCheckedVendorList(list);
    setIndeterminateVendor(!!list.length && list.length < plainOptions.length);
    setCheckAllVendor(list.length === plainOptions.length);
  };

  const onCheckAllVendorChange = (e) => {
    setCheckedVendorList(e.target.checked ? plainOptions : []);
    setIndeterminateVendor(false);
    setCheckAllVendor(e.target.checked);
  };

  //Customer
  const [checkedCustomerList, setCheckedCustomerList] = useState(props.departmentAcces.customer);
  const [indeterminateCustomer, setIndeterminateCustomer] = useState(true);
  const [checkAllCustomer, setCheckAllCustomer] = useState(false);

  const onCustomerChange = (list) => {
    setCheckedCustomerList(list);
    setIndeterminateCustomer(!!list.length && list.length < plainOptions.length);
    setCheckAllCustomer(list.length === plainOptions.length);
  };

  const onCheckAllCustomerChange = (e) => {
    setCheckedCustomerList(e.target.checked ? plainOptions : []);
    setIndeterminateCustomer(false);
    setCheckAllCustomer(e.target.checked);
  };

  //Opportunity
  const [checkedOpportunityList, setCheckedOpportunityList] = useState(props.departmentAcces.opportunity);
  const [indeterminateOpportunity, setIndeterminateOpportunity] = useState(true);
  const [checkAllOpportunity, setCheckAllOpportunity] = useState(false);

  const onOpportunityChange = (list) => {
    setCheckedOpportunityList(list);
    setIndeterminateOpportunity(!!list.length && list.length < plainOptions.length);
    setCheckAllOpportunity(list.length === plainOptions.length);
  };

  const onCheckAllOpportunityChange = (e) => {
    setCheckedOpportunityList(e.target.checked ? plainOptions : []);
    setIndeterminateOpportunity(false);
    setCheckAllOpportunity(e.target.checked);
  };

  //Talent
  const [checkedTalentList, setCheckedTalentList] = useState(props.departmentAcces.talent);
  const [indeterminateTalent, setIndeterminateTalent] = useState(true);
  const [checkAllTalent, setCheckAllTalent] = useState(false);

  const onTalentChange = (list) => {
    setCheckedTalentList(list);
    setIndeterminateTalent(!!list.length && list.length < plainOptions.length);
    setCheckAllTalent(list.length === plainOptions.length);
  };

  const onCheckAllTalentChange = (e) => {
    setCheckedTalentList(e.target.checked ? plainOptions : []);
    setIndeterminateTalent(false);
    setCheckAllTalent(e.target.checked);
  };

  // Contact

  const [checkedContactList, setCheckedContactList] = useState(props.departmentAcces.contact);
  const [indeterminateContact, setIndeterminateContact] = useState(true);
  const [checkAllContact, setCheckAllContact] = useState(false);

  const onContactChange = (list) => {
    setCheckedContactList(list);
    setIndeterminateContact(!!list.length && list.length < plainOptions.length);
    setCheckAllContact(list.length === plainOptions.length);
  };

  const onCheckAllContactChange = (e) => {
    setCheckedContactList(e.target.checked ? plainOptions : []);
    setIndeterminateContact(false);
    setCheckAllContact(e.target.checked);
  };

  // Requirement

  const [checkedRequirementList, setCheckedRequirementList] = useState(props.departmentAcces.requirement);
  const [indeterminateRequirement, setIndeterminateRequirement] = useState(true);
  const [checkAllRequirement, setCheckAllRequirement] = useState(false);

  const onRequirementChange = (list) => {
    setCheckedRequirementList(list);
    setIndeterminateRequirement(!!list.length && list.length < plainOptions.length);
    setCheckAllRequirement(list.length === plainOptions.length);
  };

  const onCheckAllRequirementChange = (e) => {
    setCheckedRequirementList(e.target.checked ? plainOptions : []);
    setIndeterminateRequirement(false);
    setCheckAllRequirement(e.target.checked);
  };

  // Publish

  const [checkedPublishList, setCheckedPublishList] = useState(props.departmentAcces.publish);
  const [indeterminatePublish, setIndeterminatePublish] = useState(true);
  const [checkAllPublish, setCheckAllPublish] = useState(false);

  const onPublishChange = (list) => {
    setCheckedPublishList(list);
    setIndeterminatePublish(!!list.length && list.length < plainOptions.length);
    setCheckAllPublish(list.length === plainOptions.length);
  };

  const onCheckAllPublishChange = (e) => {
    setCheckedPublishList(e.target.checked ? plainOptions : []);
    setIndeterminatePublish(false);
    setCheckAllPublish(e.target.checked);
  };

  // Pulse

  const [checkedPulseList, setCheckedPulseList] = useState(props.departmentAcces.pulse);
  const [indeterminatePulse, setIndeterminatePulse] = useState(true);
  const [checkAllPulse, setCheckAllPulse] = useState(false);

  const onPulseChange = (list) => {
    setCheckedPulseList(list);
    setIndeterminatePulse(!!list.length && list.length < plainOptions.length);
    setCheckAllPulse(list.length === plainOptions.length);
  };

  const onCheckAllPulseChange = (e) => {
    setCheckedPulseList(e.target.checked ? plainOptions : []);
    setIndeterminatePulse(false);
    setCheckAllPulse(e.target.checked);
  };



  function handleUpdateAccess() {
    let data = {
      vendor: checkedVendorList || [],
      customer: checkedCustomerList || [],
      opportunity: checkedOpportunityList || [],
      talent: checkedTalentList || [],
      contact: checkedContactList || [],
      requirement: checkedRequirementList || [],
      publish: checkedPublishList || [],
      pulse: checkedPulseList || [],
      departmentId: props.departmentId,

    }
    props.addDepartmentAccess(data, props.departmentId)
  }
  console.log(props.departmentAcces.vendor)
  return (

    <>
<Formik
  initialValues={{}}
  onSubmit={() => handleUpdateAccess()}
>
  {() => (
      <Form className="form-background">
        <div style={{
          /* overflow-y: scroll; */
          display: "flex",
          justifyContent: "space-between",
          height: "auto",
          overflow: "scroll",
          paddingRight: "0.6em"
        }}>
          {props.fetchingDepartmentAccess ? (
            <BundleLoader />
          ) : (
            <TabsWrapper>

              {/* Vendor */}
              <FlexContainer justifyContent="space-between">
                <div >
                  <h1>Vendor</h1>
                  <Checkbox indeterminate={indeterminateVendor} onChange={onCheckAllVendorChange} checked={checkAllVendor}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedVendorList} onChange={onVendorChange} />
                </div>
                <Spacer />

                {/* Customer */}
                <div >
                  <h1>Customer</h1>
                  <Checkbox indeterminate={indeterminateCustomer} onChange={onCheckAllCustomerChange} checked={checkAllCustomer}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedCustomerList} onChange={onCustomerChange} />
                </div>
              </FlexContainer>
              <Spacer />

              {/* Opportunity */}
              <FlexContainer justifyContent="space-between">
                <div >
                  <h1>Opportunity</h1>
                  <Checkbox indeterminate={indeterminateOpportunity} onChange={onCheckAllOpportunityChange} checked={checkAllOpportunity}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedOpportunityList} onChange={onOpportunityChange} />

                </div>
                <Spacer />
                {/* Contact */}
                <div >
                  <h1>Contact</h1>
                  <Checkbox indeterminate={indeterminateContact} onChange={onCheckAllContactChange} checked={checkAllContact}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedContactList} onChange={onContactChange} />

                </div>
              </FlexContainer>
              <Spacer />

              {/* Talent */}
              <FlexContainer justifyContent="space-between">
                <div >
                  <h1>Talent</h1>
                  <Checkbox indeterminate={indeterminateTalent} onChange={onCheckAllTalentChange} checked={checkAllTalent}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedTalentList} onChange={onTalentChange} />

                </div>

                <Spacer />
                <div >
                  <h1>Requirement</h1>
                  <Checkbox
                    indeterminate={indeterminateRequirement}
                    onChange={onCheckAllRequirementChange}
                    checked={checkAllRequirement}
                  >
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedRequirementList}
                    onChange={onRequirementChange}
                  />

                </div>
              </FlexContainer>
              <Spacer />
              <FlexContainer justifyContent="space-between">
                <div >
                  <h1>Publish</h1>
                  <Checkbox indeterminate={indeterminatePublish} onChange={onCheckAllPublishChange} checked={checkAllPublish}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedPublishList} onChange={onPublishChange} />

                </div>
                <Spacer />
                <div >
                  <h1>Pulse</h1>
                  <Checkbox indeterminate={indeterminatePulse} onChange={onCheckAllPulseChange} checked={checkAllPulse}>
                    Check all
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup options={plainOptions} value={checkedPulseList} onChange={onPulseChange} />

                </div>
              </FlexContainer>

              <FlexContainer justifyContent="flex-end" >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "20px" }}
                  // Loading={props.addingDepartmentAccess}
                  loading={props.addingDepartmentAccess}
                  onClick={() => {
                    handleUpdateAccess()
                  }}
                >
                  <FormattedMessage id="app.Update" defaultMessage="Update" />
                </Button>
              </FlexContainer>


            </TabsWrapper>
          )}
        </div>
      </Form>
  )}
</Formik>
    </>
  );
};

const mapStateToProps = ({ settings }) => ({
  addingDepartmentAccess: settings.addingDepartmentAccess,
  departmentList: settings.departmentList,
  departmentAcces: settings.departmentAcces,
  fetchingDepartmentAccess: settings.fetchingDepartmentAccess
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addDepartmentAccess,
    getDepartmentAccess
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccessForm);