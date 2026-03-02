import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button,Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { TextInput } from "../../../../../Components/UI/Elements";
import ViewEditCard from "../../../../../Components/UI/Elements/ViewEditCard";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
class SingleCertification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      editInd: true,
    };
  }
  render() {
    const {
      certification: { name, certificationId },
      handleChange,
      value,
      data,
      linkedCertification,
      handleUpdateCertification,
      handleDeleteCertification,
      updatingCertifications,
      
    } = this.props;
    console.log();
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <CertificationWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer justifyContent="space-between">
                <CertificationName style={{ flexBasis: "90%" }}>
                  {/* {certifications.name === null } */}
                  {name}
                  </CertificationName>
                <div>
                  {this.props.certification.editInd ? (
      <EditOutlinedIcon
  onClick={toggleViewType}
  sx={{
    fontSize: "0.75em",
    cursor: "pointer",
  }}
/>
                  ) : null}
                  &nbsp;
                  <Tooltip title="Delete">
                    <DeleteIcon
  onClick={() => handleDeleteCertification(certificationId)}
  sx={{
    fontSize: "14px",
    marginLeft: "5px",
    color: "red",
    verticalAlign: "middle",
    cursor: "pointer",
  }}
/>
                  </Tooltip>
                </div>
              </FlexContainer>
            ) : (
              <FlexContainer>
                <TextInput
                  name={data}
                  // value={value || libraryType}
                  defaultValue={name}
                  onChange={handleChange}
                  style={{ width: "61%" }}
                />
                <br />
             
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                   Loading={updatingCertifications}
                    //disabled={!value}
                    onClick={() =>
                     handleUpdateCertification(certificationId, value, toggleViewType())
                    }
                  >
                    {/* Save */}
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </FlexContainer>
              </FlexContainer>
            )
          }
        </ViewEditCard>
      </CertificationWrapper>
    );
  }
}

export default SingleCertification;

const CertificationWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const CertificationName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const LibraryValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;


// const AppIcon1 = (props) => (
  
//   <FontAwesomeIcon
//   icon={solid("pen-to-square")}
//   className={`pen-to-square ${props.className}`}

//   >

//   </FontAwesomeIcon>

// );


