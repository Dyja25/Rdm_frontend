import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { TextInput } from "../UI/Elements";

export default function OpenTripPlanner({ address, userAddress }) {
  const OpenTripWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    padding: 1rem;
  `;
  let addressName;
  if (address) {
    addressName = `${address.address1 || ""} ${address.address2 ||
      ""} ${address.street || ""} ${address.town || ""} ${address.city ||
      ""} ${address.state || ""} ${address.country ||
      ""} ${address.postalCode || ""}`;
  }
  let userAddressName;
  if (userAddress) {
    userAddressName = `${userAddress.address1 || ""} ${userAddress.address2 ||
      ""} ${userAddress.street || ""} ${userAddress.town ||
      ""} ${userAddress.city || ""} ${userAddress.state ||
      ""} ${userAddress.country || ""} ${userAddress.postalCode || ""}`;
  }
  return (
    <OpenTripWrapper>
      <TextInput
        placeholder="To"
        value={addressName}
        style={{ padding: "0" }}
      />
      <TextInput
        placeholder="From"
        value={userAddressName}
        style={{ padding: "0" }}
      />
      <Button style={{ width: "100%", marginTop: "0.625em" }} type="primary">
        Directions
      </Button>
    </OpenTripWrapper>
  );
}
