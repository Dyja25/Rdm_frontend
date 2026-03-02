import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Divider, Tooltip } from "antd";
import {
    Title,
    SubTitle,
    MultiAvatar,
    StyledLabel,
} from "../../../../../../Components/UI/Elements";
import { StyledCollapse } from "../../../../../../Components/UI/Antd";
import dayjs from "dayjs";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../../Components/Utils";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Panel = StyledCollapse.Panel;
class EmployeePersonalView extends Component {
    render() {
        const {
            singleEmployee: {
                bloodGroup,
                dob,
            },
            toggleViewType,
        } = this.props;
        console.log("***************", this.props);
        return (
            <>
                <FlexContainer justifyContent="flex-end">
                     <Tooltip title="Edit">
            <BorderColorIcon
              fontSize="small"
              onClick={toggleViewType}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
                </FlexContainer>
                <StyledCollapse
                    bordered={false}
                    defaultActiveKey={["0"]}
                    expandIcon={({ isActive }) => (
                         <ArrowForwardIosIcon
      style={{
        transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
      }}
    />
                    )}
                >
                    <Panel
                        header={"Personal"}
                        key="1"
                        style={{}}
                    >
                        <ProfileItemRow //label="Blood Group" 
                            label={<FormattedMessage
                                id="app.bloodGroup"
                                defaultMessage="Blood Group"
                            />}

                            value={bloodGroup} />
                        <ProfileItemRow //label="Date Of Birth" 
                            label={<FormattedMessage
                                id="app.dob"
                                defaultMessage="Date Of Birth"
                            />}
                            value={dayjs(dob).format("YYYY-MM-DD")} />
                    </Panel>
                </StyledCollapse>





                {/* <ProfileItemRow label="Role" value={role} /> */}
            </>
        );
    }
}

export default EmployeePersonalView;

const ProfileItemRow = ({ label, value }) => {
    return (
        <FlexContainer
            alignItems="center"
            flexWrap="nowrap"
            style={{ margin: "0.4rem" }}
        >
            <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
            <SubTitle style={{ marginLeft: "-1.125em" }}>{value}</SubTitle>
        </FlexContainer>
    );
};
















