// import { bindActionCreators } from "redux";
// import { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import CloseIcon from '@mui/icons-material/Close';
// import { Button, Switch, Popconfirm } from "antd";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
// import {
//   getContactAddressData,
//   addContactAddress,
//   updateContactAddress,
//   addContactMand,
//   removeAddressData
// } from "../Contact/ContactAction";
// import useGoogleMapsLoader from '../../Components/CustomMap/useGoogleMapsLoader';

// const AddressTable = (props) => {
//   const [activeSwitchIndex, setActiveSwitchIndex] = useState(null);
//   const [addresses, setAddresses] = useState(props.contactAddress);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [currentAddress, setCurrentAddress] = useState("");
//   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const apiKey = "AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY";
//   const { isLoaded } = useGoogleMapsLoader(apiKey, 'places');

//   const fetchMenuTranslations = async () => {
//     try {
//       setLoading(true);
//       const itemsToTranslate = [
//         "185", "1583", "9", "1584", "80", "81",
//         "1585", "1079", "1370", "1586", "1587"
//       ];
//       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
//       setTranslatedMenuItems(translations);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error('Error translating menu items:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMenuTranslations();
//     props.getContactAddressData(props.uniqueId, props.type);
//   }, [props.uniqueId, props.type]);

//   useEffect(() => {
//     if (props.contactAddress.length > 0) {
//       setAddresses(props.contactAddress);
//     }
//   }, [props.contactAddress]);

//   const handleSave = async (index) => {
//     try {
//       const results = await geocodeByAddress(currentAddress);
//       const latLng = await getLatLng(results[0]);
//       const addressComponents = results[0].address_components;

//     const getComponent = (types) =>
//       addressComponents.find((component) =>
//         types.every((type) => component.types.includes(type))
//       )?.long_name || "";

//     const streetNumber = getComponent(["street_number"]);
//     const route = getComponent(["route"]);
//     const street = `${streetNumber} ${route}`.trim();
//     const city = getComponent(["locality"]) || getComponent(["sublocality"]);
//     const state = getComponent(["administrative_area_level_1"]);
//     const country = getComponent(["country"]);
//     const postalCode = getComponent(["postal_code"]);

//      // const [street, city, state, country, postalCode] = currentAddress.split(", ");
//       const updatedAddresses = [...addresses];
//       updatedAddresses[index] = {
//         ...updatedAddresses[index],
//         street, city, postalCode, state, country,
//         longitude: latLng.lng,
//         latitude: latLng.lat,
//       };

//       if (updatedAddresses[index].addressId) {
//         props.updateContactAddress(updatedAddresses[index]);
//       } else {
//         props.addContactAddress(updatedAddresses[index], props.type, props.uniqueId);
//       }

//       setEditingIndex(null);
//       setCurrentAddress("");
//     } catch (error) {
//       console.error("Error saving address:", error);
//     }
//   };

//   const handleAddRow = () => {
//     const newAddress = {
//       addressId: "",
//       addressType: null,
//       address1: "",
//       address2: "",
//       town: null,
//       street: "",
//       city: "",
//       postalCode: "",
//       state: "",
//       country: "",
//       longitude: "",
//       latitude: "",
//       creatorId: null,
//       employeeId: null,
//       contactPersonId: null,
//       countryCode: null,
//       houseNo: null,
//       country_alpha2_code: null,
//       country_alpha3_code: null,
//       xlAddress: null,
//       primaryInd: false,
//     };
//     setAddresses([...addresses, newAddress]);
//     setEditingIndex(addresses.length);
//     setCurrentAddress("");
//     setTimeout(() => {
//       const inputs = document.querySelectorAll(".location-search-input");
//       inputs[inputs.length - 1]?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };

//   const handleChange = (address) => {
//     setCurrentAddress(address);
//   };

//   const handleSwitchChange = (index, checked, item) => {
//     const updatedAddresses = addresses.map((address, idx) => ({
//       ...address,
//       primaryInd: checked && idx === index,
//     }));
//     setAddresses(updatedAddresses);
//     setActiveSwitchIndex(checked ? index : null);
//     props.addContactMand(item.addressId, checked);
//   };

//   const handleCancel = (index) => {
//     if (editingIndex === addresses.length - 1 && !currentAddress.trim()) {
//       const updatedAddresses = [...addresses];
//       updatedAddresses.pop();
//       setAddresses(updatedAddresses);
//     }
//     setEditingIndex(null);
//     setCurrentAddress("");
//   };
//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     setCurrentAddress(
//       `${addresses[index].street}, ${addresses[index].city}, ${addresses[index].state}, ${addresses[index].country}, ${addresses[index].postalCode}`
//     );
//   };
//   return (
//     <>
//       {!isLoaded ? (
//         <div>Loading Google Autoplaces...</div>
//       ) : (
//         <div className="address-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Address</th>
//                 <th>Billing Address</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {addresses.map((item, index) => (
//                 <tr key={item.addressId || index}>
//                   <td
//   style={{ cursor: "pointer" }}
// >
//   {editingIndex === index ? (
//     <PlacesAutocomplete
//       value={currentAddress}
//       onChange={handleChange}
//       onSelect={handleChange}
//     >
//       {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//         <div>
//           <input
//             {...getInputProps({
//               placeholder: translatedMenuItems[9],
//               className: "location-search-input",
//               onBlur: () => handleSave(index),
//               onKeyDown: (e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   handleSave(index);
//                 }
//               },
//             })}
//             autoFocus
//           />
//           <div className="autocomplete-dropdown-container">
//             {loading && <div>Loading...</div>}
//             {suggestions.map((suggestion) => {
//               const className = suggestion.active
//                 ? "suggestion-item--active"
//                 : "suggestion-item";
//               const style = suggestion.active
//                 ? { backgroundColor: "#fafafa", cursor: "pointer" }
//                 : { backgroundColor: "#ffffff", cursor: "pointer" };
//               return (
//                 <div
//                   key={suggestion.placeId}
//                   {...getSuggestionItemProps(suggestion, { className, style })}
//                 >
//                   <span>{suggestion.description}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </PlacesAutocomplete>
//   ) : (
//     <div onClick={() => handleEdit(index)} >
//        {item.street}, {item.city}, {item.state}, {item.country},
//                     {item.postalCode}
//     </div>
//   )}
// </td>

//                   <td>
//                     <Popconfirm
//                       title={translatedMenuItems[6]}
//                       onConfirm={() => handleSwitchChange(index, !item.primaryInd, item)}
//                       okText={translatedMenuItems[10]}
//                       cancelText={translatedMenuItems[7]}
//                     >
//                       <Switch
//                         checkedChildren="Yes"
//                         unCheckedChildren="No"
//                         checked={item.primaryInd}
//                         disabled={activeSwitchIndex !== null && activeSwitchIndex !== index}
//                       />
//                     </Popconfirm>
//                   </td>

//                   <td>
//                  {item.addressId && (
//                       <Popconfirm
//                         title={translatedMenuItems[6]}
//                         onConfirm={() => props.removeAddressData(item.addressId)}
//                         okText={translatedMenuItems[10]}
//                         cancelText={translatedMenuItems[7]}
//                       >
//                         <DeleteOutlineIcon className="!text-icon !text-[tomato] cursor-pointer" />
//                       </Popconfirm>
//                     )}
//                     {editingIndex === index ? (
//                   <>
//                       <CloseIcon onClick={() => handleCancel(index)} className="!text-icon cursor-pointer" />
//                   </>
//                 ) : (
//                 ""
//                 )}
//               </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="flex justify-end mt-3">
//             <Button type="primary" onClick={handleAddRow}>
//               {translatedMenuItems[8]}
//             </Button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const mapStateToProps = ({ sector, auth, contact }) => ({
//   contactAddress: contact.contactAddress,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getContactAddressData,
//       addContactAddress,
//       updateContactAddress,
//       addContactMand,
//       removeAddressData,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(AddressTable);


import { bindActionCreators } from "redux";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Switch, Popconfirm } from "antd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  getContactAddressData,
  addContactAddress,
  updateContactAddress,
  addContactMand,
  removeAddressData,
} from "../Contact/ContactAction";
import useGoogleMapsLoader from "../../Components/CustomMap/useGoogleMapsLoader";

const AddressTable = (props) => {
  const [activeSwitchIndex, setActiveSwitchIndex] = useState(null);
  const [addresses, setAddresses] = useState(props.contactAddress);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ API key from env or null
  const apiKey = null;
  const { isLoaded } = useGoogleMapsLoader(apiKey, "places");

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true);
        const itemsToTranslate = [
          "185",
          "1583",
          "9",
          "1584",
          "80",
          "81",
          "1585",
          "1079",
          "1370",
          "1586",
          "1587",
        ];
        const translations = await props.translateText(
          itemsToTranslate,
          props.selectedLanguage
        );
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error("Error translating menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuTranslations();
    props.getContactAddressData(props.uniqueId, props.type);
  }, [props.uniqueId, props.type]);

  useEffect(() => {
    if (props.contactAddress.length > 0) {
      setAddresses(props.contactAddress);
    }
  }, [props.contactAddress]);

  const handleSave = async (index) => {
    try {
      let street = "",
        city = "",
        state = "",
        country = "",
        postalCode = "",
        latLng = { lat: "", lng: "" };

      if (apiKey) {
        // ✅ Google Autocomplete flow
        const results = await geocodeByAddress(currentAddress);
        latLng = await getLatLng(results[0]);
        const addressComponents = results[0].address_components;

        const getComponent = (types) =>
          addressComponents.find((component) =>
            types.every((type) => component.types.includes(type))
          )?.long_name || "";

        const streetNumber = getComponent(["street_number"]);
        const route = getComponent(["route"]);
        street = `${streetNumber} ${route}`.trim();
        city = getComponent(["locality"]) || getComponent(["sublocality"]);
        state = getComponent(["administrative_area_level_1"]);
        country = getComponent(["country"]);
        postalCode = getComponent(["postal_code"]);
      } else {
        // ✅ Manual entry fallback
        const parts = currentAddress.split(",").map((p) => p.trim());
        street = parts[0] || "";
        city = parts[1] || "";
        state = parts[2] || "";
        country = parts[3] || "";
        postalCode = parts[4] || "";
      }

      const updatedAddresses = [...addresses];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        street,
        city,
        postalCode,
        state,
        country,
        longitude: latLng.lng || "",
        latitude: latLng.lat || "",
      };

      if (updatedAddresses[index].addressId) {
        props.updateContactAddress(updatedAddresses[index]);
      } else {
        props.addContactAddress(
          updatedAddresses[index],
          props.type,
          props.uniqueId
        );
      }

      setEditingIndex(null);
      setCurrentAddress("");
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleAddRow = () => {
    const newAddress = {
      addressId: "",
      addressType: null,
      address1: "",
      address2: "",
      town: null,
      street: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
      longitude: "",
      latitude: "",
      creatorId: null,
      employeeId: null,
      contactPersonId: null,
      countryCode: null,
      houseNo: null,
      country_alpha2_code: null,
      country_alpha3_code: null,
      xlAddress: null,
      primaryInd: false,
    };
    setAddresses([...addresses, newAddress]);
    setEditingIndex(addresses.length);
    setCurrentAddress("");
    setTimeout(() => {
      const inputs = document.querySelectorAll(".location-search-input");
      inputs[inputs.length - 1]?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleChange = (address) => {
    setCurrentAddress(address);
  };

  const handleSwitchChange = (index, checked, item) => {
    const updatedAddresses = addresses.map((address, idx) => ({
      ...address,
      primaryInd: checked && idx === index,
    }));
    setAddresses(updatedAddresses);
    setActiveSwitchIndex(checked ? index : null);
    props.addContactMand(item.addressId, checked);
  };

  const handleCancel = (index) => {
    if (editingIndex === addresses.length - 1 && !currentAddress.trim()) {
      const updatedAddresses = [...addresses];
      updatedAddresses.pop();
      setAddresses(updatedAddresses);
    }
    setEditingIndex(null);
    setCurrentAddress("");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentAddress(
      `${addresses[index].street}, ${addresses[index].city}, ${addresses[index].state}, ${addresses[index].country}, ${addresses[index].postalCode}`
    );
  };

  return (
    <div className="address-table">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Billing Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((item, index) => (
            <tr key={item.addressId || index}>
              <td style={{ cursor: "pointer" }}>
                {editingIndex === index ? (
                  apiKey ? (
                    // ✅ Autocomplete when API key is available
                    <PlacesAutocomplete
                      value={currentAddress}
                      onChange={handleChange}
                      onSelect={handleChange}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: translatedMenuItems[9],
                              className: "location-search-input",
                              onBlur: () => handleSave(index),
                              onKeyDown: (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleSave(index);
                                }
                              },
                            })}
                            autoFocus
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              const style = suggestion.active
                                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                : { backgroundColor: "#ffffff", cursor: "pointer" };
                              return (
                                <div
                                  key={suggestion.placeId}
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  ) : (
                    // ✅ Manual input when no API key
                    <input
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                      placeholder={translatedMenuItems[9]}
                      className="location-search-input"
                      onBlur={() => handleSave(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSave(index);
                        }
                      }}
                      autoFocus
                    />
                  )
                ) : (
                  <div onClick={() => handleEdit(index)}>
                    {item.street}, {item.city}, {item.state}, {item.country},{" "}
                    {item.postalCode}
                  </div>
                )}
              </td>

              <td>
                <Popconfirm
                  title={translatedMenuItems[6]}
                  onConfirm={() =>
                    handleSwitchChange(index, !item.primaryInd, item)
                  }
                  okText={translatedMenuItems[10]}
                  cancelText={translatedMenuItems[7]}
                >
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    checked={item.primaryInd}
                    disabled={
                      activeSwitchIndex !== null && activeSwitchIndex !== index
                    }
                  />
                </Popconfirm>
              </td>

              <td>
                {item.addressId && (
                  <Popconfirm
                    title={translatedMenuItems[6]}
                    onConfirm={() => props.removeAddressData(item.addressId)}
                    okText={translatedMenuItems[10]}
                    cancelText={translatedMenuItems[7]}
                  >
                    <DeleteOutlineIcon className="!text-icon !text-[tomato] cursor-pointer" />
                  </Popconfirm>
                )}
                {editingIndex === index ? (
                  <CloseIcon
                    onClick={() => handleCancel(index)}
                    className="!text-icon cursor-pointer"
                  />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-3">
        <Button type="primary" onClick={handleAddRow}>
          {translatedMenuItems[8]}
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ contact }) => ({
  contactAddress: contact.contactAddress,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactAddressData,
      addContactAddress,
      updateContactAddress,
      addContactMand,
      removeAddressData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddressTable);
