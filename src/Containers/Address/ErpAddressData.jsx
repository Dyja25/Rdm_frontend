import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { Button, Input } from "antd";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Switch, Popconfirm } from "antd";
import {
  getContactAddressData,
  addContactAddress,
updateContactAddress,
  addContactMand,
  removeAddressData,
  addDeliveryAdsress
} from "../Main/Suppliers/SuppliersAction";
import {getApiType} from "../../Containers/Activity/ActivityAction"
import useGoogleMapsLoader from '../../Components/CustomMap/useGoogleMapsLoader';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ErpAddressData = (props) => {
  const [activeSwitchIndex, setActiveSwitchIndex] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [originalAddresses, setOriginalAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const apiKey =props.apiType.apiKey1;
  const { isLoaded } = useGoogleMapsLoader(apiKey, "places");

  useEffect(() => {
    props.getContactAddressData(props.uniqueId, props.type);
     props.getApiType(props.orgId,"GeoInfo","Google")
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       "185", //  "Address",//0
       "1329", //  "Open",//1
        "37", //  "hours",//2
         "772", //  "Delivery",//3
         "316", //Notes,4
         "1010",//Billing5
         "85",//add6
         "1246",//Update 7
         "84",//Delete 8
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    setAddresses(props.contactAddress);
    setOriginalAddresses(JSON.parse(JSON.stringify(props.contactAddress)));
  }, [props.contactAddress]);

// const handleSaveAddress = async (index) => {
//   try {
//     const results = await geocodeByAddress(currentAddress);
//     const latLng = await getLatLng(results[0]);

//     const addressComponents = results[0].address_components;

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

//     const updated = [...addresses];
//     const newAddress = {
//       ...updated[index],
//       street,
//       city,
//       state,
//       country,
//       postalCode,
//       longitude: latLng.lng,
//       latitude: latLng.lat,
//     };

//     updated[index] = newAddress;
//     setAddresses(updated);

//     const isNew = !newAddress.addressId;

//     if (isNew) {
//       const res = await props.addContactAddress(newAddress, props.type, props.uniqueId);
//       if (res && res.addressId) {
//         updated[index].addressId = res.addressId;
//       }
//     } else {
//       const original = originalAddresses[index];
//       const hasChanged =
//         street !== original?.street ||
//         city !== original?.city ||
//         state !== original?.state ||
//         country !== original?.country ||
//         postalCode !== original?.postalCode;

//       if (hasChanged) {
//         await props.updateContactAddress(newAddress);
//       }
//     }

//     setEditingIndex(null);
//     setEditingField(null);
//   } catch (err) {
//     console.error("Error in address save:", err);
//   }
// };


  const handleSaveAddress = async (index) => {
    try {
      let street = "",
        city = "",
        state = "",
        country = "",
        postalCode = "",
        latLng = { lat: "", lng: "" };

      if (apiKey) {
        // ✅ Autocomplete flow
        const results = await geocodeByAddress(currentAddress);
        latLng = await getLatLng(results[0]);
        const addressComponents = results[0].address_components;

        const getComponent = (types) =>
          addressComponents.find((c) =>
            types.every((t) => c.types.includes(t))
          )?.long_name || "";

        const streetNumber = getComponent(["street_number"]);
        const route = getComponent(["route"]);
        street = `${streetNumber} ${route}`.trim();
        city = getComponent(["locality"]) || getComponent(["sublocality"]);
        state = getComponent(["administrative_area_level_1"]);
        country = getComponent(["country"]);
        postalCode = getComponent(["postal_code"]);
      } else {
        // ✅ Manual flow
        const parts = currentAddress.split(",").map((p) => p.trim());
        street = parts[0] || "";
        city = parts[1] || "";
        state = parts[2] || "";
        country = parts[3] || "";
        postalCode = parts[4] || "";
      }

      const updated = [...addresses];
      const newAddress = {
        ...updated[index],
        street,
        city,
        state,
        country,
        postalCode,
        longitude: latLng.lng || "",
        latitude: latLng.lat || "",
      };

      updated[index] = newAddress;
      setAddresses(updated);

      const isNew = !newAddress.addressId;
      if (isNew) {
        const res = await props.addContactAddress(
          newAddress,
          props.type,
          props.uniqueId
        );
        if (res && res.addressId) {
          updated[index].addressId = res.addressId;
        }
      } else {
        const original = originalAddresses[index];
        const hasChanged =
          street !== original?.street ||
          city !== original?.city ||
          state !== original?.state ||
          country !== original?.country ||
          postalCode !== original?.postalCode;

        if (hasChanged) {
          await props.updateContactAddress(newAddress);
        }
      }

      setEditingIndex(null);
      setEditingField(null);
    } catch (err) {
      console.error("Error in address save:", err);
    }
  };
const handleTimeChange = async (index, field, value) => {
  const updated = [...addresses];
  updated[index][field] = value;
  setAddresses(updated);

  const isNew = !updated[index].addressId;

  if (isNew) {
    const res = await props.addContactAddress(updated[index], props.type,props.uniqueId);
    if (res && res.addressId) {
      updated[index].addressId = res.addressId;
    }
  } else {
    const original = originalAddresses[index];
    if (original?.[field] !== value) {
      await props.updateContactAddress(updated[index]);
    }
  }
};


const handleNoteChange = async (index, value) => {
  const updated = [...addresses];
  updated[index].dlvryNote = value;
  setAddresses(updated);

  const isNew = !updated[index].addressId;

  if (isNew) {
    const res = await props.addContactAddress(updated[index], props.type,props.uniqueId);
    if (res && res.addressId) {
      updated[index].addressId = res.addressId;
    }
  } else {
    const original = originalAddresses[index];
    if (original?.dlvryNote !== value) {
      await props.updateContactAddress(updated[index]);
    }
  }
};


 const handleEditField = (index, field) => {
    setEditingIndex(index);
    setEditingField(field);

    if (field === "address") {
      const a = addresses[index];
      setCurrentAddress(
        `${a.street || ""}, ${a.city || ""}, ${a.state || ""}, ${
          a.country || ""
        }, ${a.postalCode || ""}`
      );
    }
  };


  // const handleEditField = (index, field) => {
  //   setEditingIndex(index);
  //   setEditingField(field);

  //   if (field === "address") {
  //     const a = addresses[index];
  //     setCurrentAddress(
  //       `${a.street || ""}, ${a.city || ""}, ${a.state || ""}, ${a.country || ""}, ${a.postalCode || ""}`
  //     );
  //   }
  // };

  // const handleAddRow = () => {
  //   const newAddress = {
  //     addressId: "",
  //     addressType: null,
  //     street: "",
  //     city: "",
  //     postalCode: "",
  //     state: "",
  //     country: "",
  //     longitude: "",
  //     latitude: "",
  //     primaryInd: false,
  //     deleveryInd: false,
  //     openStartTm: null,
  //     openEndTm: null,
  //     dlvryStartTm: null,
  //     dlvryEndTm: null,
  //     dlvryNote: "",
  //   };
  //   setAddresses([...addresses, newAddress]);
  //   setEditingIndex(addresses.length);
  //   setEditingField("address");
  //   setCurrentAddress("");
  // };


   const handleAddRow = () => {
    const newAddress = {
      addressId: "",
      addressType: null,
      street: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
      longitude: "",
      latitude: "",
      primaryInd: false,
      deleveryInd: false,
      openStartTm: null,
      openEndTm: null,
      dlvryStartTm: null,
      dlvryEndTm: null,
      dlvryNote: "",
    };
    setAddresses([...addresses, newAddress]);
    setEditingIndex(addresses.length);
    setEditingField("address");
    setCurrentAddress("");
  };
  const handleSwitchChange = async (index, checked, item) => {
    const updated = addresses.map((addr, i) => ({
      ...addr,
      primaryInd: i === index ? checked : false,
    }));
    setAddresses(updated);
    setActiveSwitchIndex(checked ? index : null);
    await props.addContactMand(item.addressId, checked);
  };

  const handleDelivery = async (index, checked, item) => {
    const updated = addresses.map((addr, i) =>
      i === index ? { ...addr, deleveryInd: checked } : addr
    );
    setAddresses(updated);
    setDeliveryAddress(checked ? index : null);
    await props.addDeliveryAdsress(item.addressId, checked);
  };

  return (
 
    <div className="address-table">
      <table>
        <thead>
          <tr className="!text-xs font-poppins font-bold">
            <th> {translatedMenuItems[0]}</th>
            <th> {translatedMenuItems[1]} {translatedMenuItems[2]}</th>
            <th>{translatedMenuItems[3]} {translatedMenuItems[2]}</th>
            <th>{translatedMenuItems[3]} {translatedMenuItems[4]}</th>
            <th>{translatedMenuItems[5]}</th>
            <th>{translatedMenuItems[3]}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((item, index) => (
            <tr key={item.addressId || index}>
              {/* <td data-label={translatedMenuItems[0]} className="w-[22%] text-xs">
                {editingIndex === index && editingField === "address" ? (
                  <PlacesAutocomplete value={currentAddress} onChange={setCurrentAddress} onSelect={setCurrentAddress}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: "Search Address...",
                            className: "location-search-input",
                            onBlur: () => handleSaveAddress(index),
                            onKeyDown: (e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleSaveAddress(index);
                              }
                            },
                          })}
                          autoFocus
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className: suggestion.active ? "suggestion-item--active" : "suggestion-item",
                                style: { backgroundColor: suggestion.active ? "#fafafa" : "#ffffff", cursor: "pointer" },
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                ) : (
                  <div onClick={() => handleEditField(index, "address")}>
                
                      {[item.street, item.city, item.state, item.country, item.postalCode]
    .filter(Boolean)
    .join(", ")}
                  </div>
                )}
              </td> */}

               <td data-label={translatedMenuItems[0]} className="w-[22%] text-xs">
                {editingIndex === index && editingField === "address" ? (
                  apiKey && isLoaded ? (
                    // ✅ Autocomplete input
                    <PlacesAutocomplete
                      value={currentAddress}
                      onChange={setCurrentAddress}
                      onSelect={setCurrentAddress}
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
                              placeholder: "Search Address...",
                              className: "location-search-input",
                              onBlur: () => handleSaveAddress(index),
                              onKeyDown: (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleSaveAddress(index);
                                }
                              },
                            })}
                            autoFocus
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((sug) => (
                              <div
                                key={sug.placeId}
                                {...getSuggestionItemProps(sug, {
                                  className: sug.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item",
                                  style: {
                                    backgroundColor: sug.active
                                      ? "#fafafa"
                                      : "#fff",
                                    cursor: "pointer",
                                  },
                                })}
                              >
                                <span>{sug.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  ) : (
                    // ✅ Manual input if no API key
                    <Input
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                      placeholder="Enter address manually"
                      onBlur={() => handleSaveAddress(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSaveAddress(index);
                        }
                      }}
                      autoFocus
                    />
                  )
                ) : (
                  <div onClick={() => handleEditField(index, "address")}>
                    {[item.street, item.city, item.state, item.country, item.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                )}
              </td>

              <td data-label={`${translatedMenuItems[1]} ${translatedMenuItems[2]}`}>
               {item.addressId && (
                <>
                {editingIndex === index && editingField === "openHours" ? (
                  <div className="flex">
                    <input
  type="time"
  value={item.openStartTm || ""}
  onChange={(e) => handleTimeChange(index, "openStartTm", e.target.value)}
  onBlur={(e) => {
    handleTimeChange(index, "openStartTm", e.target.value);
    setEditingIndex(null);
    setEditingField(null);
  }}
/>

                    <input
                      type="time"
                      value={item.openEndTm || ""}
                      onChange={(e) => handleTimeChange(index, "openEndTm", e.target.value)}
                      onBlur={(e) => {
    handleTimeChange(index, "openEndTm", e.target.value);
    setEditingIndex(null);
    setEditingField(null);
  }}
                    />
                  </div>
                ) : (
                  <div onClick={() => handleEditField(index, "openHours")}>
                    {item.openStartTm || "--:--"} - {item.openEndTm || "--:--"}
                  </div>
                )}
               </>
               )}
              </td>

              <td data-label={`${translatedMenuItems[3]} ${translatedMenuItems[2]}`}>
                 {item.addressId && (
                  <>
                {editingIndex === index && editingField === "deliveryHours" ? (
                  <div className="flex">
                    <input
                      type="time"
                      value={item.dlvryStartTm || ""}
                      onChange={(e) => handleTimeChange(index, "dlvryStartTm", e.target.value)}
                       onBlur={(e) => {
    handleTimeChange(index, "dlvryStartTm", e.target.value);
    setEditingIndex(null);
    setEditingField(null);
  }}
                    />
                    <input
                      type="time"
                      value={item.dlvryEndTm || ""}
                      onChange={(e) => handleTimeChange(index, "dlvryEndTm", e.target.value)}
                      onBlur={(e) => {
    handleTimeChange(index, "dlvryEndTm", e.target.value);
    setEditingIndex(null);
    setEditingField(null);
  }}
                    />
                  </div>
                ) : (
                  <div onClick={() => handleEditField(index, "deliveryHours")}>
                    {item.dlvryStartTm || "--:--"} - {item.dlvryEndTm || "--:--"}
                  </div>
                )}
                </>
                 )}
              </td>

              <td data-label={`${translatedMenuItems[3]} ${translatedMenuItems[4]}`} className="w-[15%]">
                 {item.addressId && (
                  <>
                {editingIndex === index ? (
                  <Input
                    value={item.dlvryNote}
                    onChange={(e) => {
                      const updated = [...addresses];
                      updated[index].dlvryNote = e.target.value;
                      setAddresses(updated);
                    }}
                    onBlur={(e) => {
                      handleNoteChange(index, e.target.value);
                      setEditingIndex(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleNoteChange(index, e.target.value);
                        setEditingIndex(null);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => handleEditField(index, "dlvryNote")}>
                    {item.dlvryNote || <div>{translatedMenuItems[7]}</div>}
                  </div>
                )}
                </>
                 )}
              </td>

              <td data-label={translatedMenuItems[5]} className="w-[13%]">
                 {item.addressId && (
                <div className="flex items-center justify-center">
                <Popconfirm
                  title="Change status ?"
                  onConfirm={() => handleSwitchChange(index, !item.primaryInd, item)}
                  okText="Yes"
                  cancelText="No"
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
                </div>
                 )}
              </td>
              <td data-label={translatedMenuItems[3]} className="delivery-status w-[13%]">
                 {item.addressId && (
                <div className="flex items-center justify-center">
                <Popconfirm
                  title="Change status ?"
                   onConfirm={() => handleDelivery(index, !item.deleveryInd, item)}
                  okText="Yes"
                  cancelText="No"
                  
                >
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    checked={item.deleveryInd}
                    disabled={props.type && props.type === "supplier"}
                  />
                </Popconfirm>
                </div>
                 )}
              </td>
              <td data-label={translatedMenuItems[8]} className="delete-column">
                {item.addressId && (
                  <Popconfirm
                    title="Confirm Address Delete?"
                    onConfirm={() => props.removeAddressData(item.addressId)}
                  >
                    <DeleteOutlineIcon className="!text-icon text-[#ff6347] cursor-pointer" />
                  </Popconfirm>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex mt-3 justify-end">
        <Button onClick={handleAddRow} type="primary">
          <DataSaverOnIcon className="text-white mr-1" /> {translatedMenuItems[6]}
        </Button>
      </div>
    </div>
  );
};



const mapStateToProps = ({ sector, auth, contact,suppliers,activity }) => ({
  contactAddress: suppliers.contactAddress,
  apiType:activity.apiType,
   orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactAddressData,
         getApiType,
      addContactAddress,
    updateContactAddress,
      addContactMand,
      removeAddressData,
      addDeliveryAdsress
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ErpAddressData);