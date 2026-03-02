import React, { useMemo } from "react";
import { ProgressiveImage } from "../../Utils";
import { Tooltip, Avatar } from "antd";
import { base_url } from "../../../Config/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProfilePreviewImg from "../../../assets/Images/ProfilePreviewImg.webp";

const PlainAvatar = ({
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
    width: imgWidth || "-webkit-fill-available",
    height: imgHeight || "-webkit-fill-available",
  }), [imgWidth, imgHeight]);

  return (
    <>
      {imageId || imageURL ? (
        <div style={wrapperStyle}>
          <ProgressiveImage
            preview={ProfilePreviewImg}
            image={imageId ? `${base_url}/get/image/${imageId}/${userId}/${orgId}` : imageURL}
            width={imgWidth || "-webkit-fill-available"}
            height={imgHeight || "-webkit-fill-available"}
              token={token} 
            loading="lazy"
          />
        </div>
      ) : (
        <Tooltip title={primaryTitle}>
         <div>
            {primaryTitle && primaryTitle.slice(0, 2)}
</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PlainAvatar);

