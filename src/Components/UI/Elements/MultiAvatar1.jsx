import React, { useMemo } from "react";
import { ProgressiveImage } from "../../Utils";
import { Tooltip, Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import ProfilePreviewImg from "../../../assets/Images/ProfilePreviewImg.webp";

const MultiAvatar = ({
  imageId,
  imageURL,
  primaryTitle,
  imgWidth,
  imgHeight,
  smallAvatar,
   userId,
  orgId,
  token
}) => {
  const size = smallAvatar && !imageId && !imageURL ? "small" : "large";
  const avatarStyle = useMemo(() => ({
    backgroundColor: "#e97c28ba",
    fontFamily: "Poppins",
  }), []);

  const wrapperStyle = useMemo(() => ({
    borderRadius: "1.0625rem",
    width: imgWidth || "1.8rem",
    height: imgHeight || "1.8rem",
  }), [imgWidth, imgHeight]);

  return (
    <>
      {imageId || imageURL ? (
        <div style={wrapperStyle}>
          <ProgressiveImage
            preview={ProfilePreviewImg}
    image={imageId ? `${base_url}/get/image/${imageId}/${userId}/${orgId}` : imageURL}
            width={imgWidth || "1.8rem"}
            height={imgHeight || "1.8rem"}
            borderRadius={"1.0625rem"}
            token={token}
            loading="lazy"
          />
        </div>
      ) : (
        <Tooltip title={primaryTitle}>
          <Avatar style={avatarStyle}>
            {primaryTitle && primaryTitle.slice(0, 2)}
          </Avatar>
        </Tooltip>
      )}
    </>
  );
};

const mapStateToProps = ({
  auth,

}) => ({
  userId: auth.userDetails.userId,
 
  orgId: auth.userDetails.organizationId,
   token:auth.token
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

   
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MultiAvatar);