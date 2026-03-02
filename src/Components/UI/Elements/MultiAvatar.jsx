import React from "react";
import Avatar from "antd/lib/avatar";
import { ProgressiveImage } from "../../Utils";
import { base_url } from "../../../Config/Auth";
import ProfilePreview from "../../../Assets/Images/ProfilePreview.png";
const MultiAvatar = ({
  imageId,
  imageURL,
  primaryTitle,
  imgWidth,
  imgHeight,
  smallAvatar,
  imgRadius,
  // bgcolor,
  minAvatarWidth,
}) => {
  const size = smallAvatar && !imageId && !imageURL ? "small" : "large";
  // const fontSize = size === "large" ? 18 : 12;
  const color = size === "large" ? "#fff" : "#fff";
  // const backgroundColor = size === "large" ? "#337df4" : "#337df4";
  const backgroundColor = size === "large" ? "#337df4" : "#337df4";
  const borderWidth = size === "large" ? "0.0625em" : "0.0625em";
  const borderColor = size === "large" ? "#337df4" : "#337df4";
  const borderStyle = size === "large" ? "solid" : "solid";
  return (
    <>
      {imageId || imageURL ? (
        imageId ? (
          <div style={{  }}>
            <ProgressiveImage
              preview={ProfilePreview}
              image={`${base_url}/image/${imageId}`}
              width={imgWidth || "3.4375em"}
              height={imgHeight || "3.4375em"}
              // borderRadius={imgRadius}
              borderRadius={'1.0625em'}
            />
          </div>
        ) : (
            <ProgressiveImage
              preview={ProfilePreview}
              image={imageURL}
              width={imgWidth || "3.4375em"}
              height={imgHeight || "3.4375em"}
              // borderRadius={imgRadius}
             borderRadius={'1.0625em'}
            />
          )
      ) : (
          <Avatar
            size={size || "large"}
            style={{
              color,
              // backgroundColor: bgcolor ? "red" : backgroundColor,
              backgroundColor,
              // fontSize,
              borderWidth,
              borderColor,
              borderStyle,
              minWidth: minAvatarWidth,
            }}
          >
            {primaryTitle && primaryTitle.split("")[0].toUpperCase()}
          </Avatar>
        )}
    </>
  );
};

export default MultiAvatar;
