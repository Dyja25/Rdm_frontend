import React from "react";
import { Tooltip } from "antd";
import { Field, ErrorMessage } from "formik";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import FormikPlacesAutoComplete from "./FormikPlacesAutoComplete";
import { InputComponent } from "./InputComponent";
import useGoogleMapsLoader from '../../../Components/CustomMap/useGoogleMapsLoader.jsx'

const AddressFieldArray1 = ({ arrayHelpers, values, singleAddress }) => {
  console.log({ arrayHelpers, values, singleAddress });
  const apiKey = "AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY";
  const { isLoaded, error } = useGoogleMapsLoader(apiKey, 'places');

  return (
    <>
      {!isLoaded ? (
      <div>Loading Google Autoplaces...</div>
     ) : (
     <div>
      <mt-3 />
      {values &&
        values.loadingAddress.map((loadingAddress, index) => (
          <div key={index}>
            <div className="flex w-[100%] items-center ">
              <AddLocationAltIcon className="!text-icon text-[purple] "
              />
              <Field
                name={`loadingAddress[${index}]`}
                component={FormikPlacesAutoComplete}
                isColumn
                options={{}}
              />
            </div>

            <span>
              <div className="text-xs font-bold italic text-[#1890ff]"
              >
                Address input is only allowed using Location feature
              </div>

              <div className="flex justify-between max-sm:flex-col">
                <div className="w-[32%] max-sm:w-wk">
                  <Field
                    name={`loadingAddress.${index}.address1`}
                    label="Address 1"
                    isColumn
                    component={InputComponent}
                    width={"100%"}
                    inlineLabel
                  />
                  <ErrorMessage
                    name={`loadingAddress.${index}.address1`}
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="w-[32%] max-sm:w-wk">
                  <Field
                    name={`loadingAddress.${index}.street`}
                    label="Street"
                    component={InputComponent}
                    width={"100%"}
                    isColumn
                    inlineLabel
                  />
                  <ErrorMessage
                    name={`loadingAddress.${index}.street`}
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="w-[32%] max-sm:w-wk">
                  <Tooltip title="Use Location feature for easy search ">
                    <Field
                      name={`loadingAddress.${index}.postalCode`}
                      label="Pin code"
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                      inlineLabel
                    />
                  </Tooltip>
                </div>
              </div>

              <div className="flex justify-between max-sm:flex-col">
                <div className="w-[32%] max-sm:w-wk">
                  <Tooltip title="Use Location feature for easy search ">
                    <Field
                      name={`loadingAddress.${index}.city`}
                      label="City"
                      component={InputComponent}
                      disabled
                      width={"100%"}
                      isColumn
                      inlineLabel
                    />
                  </Tooltip>
                </div>

                <div className="w-[32%] max-sm:w-wk">
                  <Tooltip title="Use Location feature for easy search ">
                    <Field
                      name={`loadingAddress.${index}.state`}
                      label="State/Province"
                      component={InputComponent}
                      disabled
                      width={"100%"}
                      isColumn
                      inlineLabel
                    />
                  </Tooltip>
                </div>

                <div className="w-[32%] max-sm:w-wk">
                  <Tooltip title="Use Location feature for easy search ">
                    <Field
                      name={`loadingAddress.${index}.country`}
                      label="Country"
                      disabled
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                      inlineLabel
                    />
                  </Tooltip>
                </div>
              </div>
            </span>
          </div>
        ))}
    </div>
       )}
    </>
   
  );
};

export default AddressFieldArray1;