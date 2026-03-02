import React from "react";
import { message } from "antd";
import { StyledUpload, StyledModal } from "../../UI/Antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { base_url } from "../../../Config/Auth";
import axios from "axios";
const token = sessionStorage.getItem("token");

class Upload2 extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
  };
  beforeUpload =async (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can upload only JPG or PNG file!");
      file.flag = true;
      return false;
    }
    const isLt2M = file.size / 1024 < 700;
    // file.size/1024/1024 <25
    if (!isLt2M) {
      message.error("Image size must be smaller than 700KB!");
      file.flag = true;
      return false;
    }

     const compressedFile = await this.convertToWebP(file);
    if (compressedFile) {
      file.convertedFile = compressedFile;
      return true;
    } else {
      alert("Failed to process the image!");
      file.flag = true;
      return false;
    }

    

  };

   convertToWebP = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDimension = 800; // Resize if needed
          let { width, height } = img;

          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                console.log(`Original Size: ${(file.size / 1024).toFixed(2)} KB`);
                console.log(`Compressed Size: ${(blob.size / 1024).toFixed(2)} KB`);
                resolve(blob);
              } else {
                reject(new Error("WebP conversion failed"));
              }
            },
            "image/webp",
            0.5 // compression quality
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  handleImageUpload = ({ onSuccess, onError, file }) => {
    const uploadFile = file.convertedFile
      ? new File([file.convertedFile], file.name.replace(/\.\w+$/, ".webp"), {
          type: "image/webp",
        })
      : file;

    let formData = new FormData();
    formData.append("image", uploadFile); // ✅ must match backend field name

    axios
      .post(`${base_url}/image`, formData, {
        headers: {
           "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : undefined,
          // Do NOT set Content-Type manually → Axios adds boundary automatically
        },
      })
      .then((res) => {
        onSuccess();
        this.props.form.setFieldValue(this.props.field.name, res.data);
        this.setState({ previewVisible: false, previewImage: "" });
      })
      .catch((err) => {
        console.error(err);
        onError();
      });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList, file }) => {
   
    if (file.flag === true) {
      return this.setState({ fileList: [] });
    }

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        {/* <Icon /> */}
         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <StyledUpload
          accept=".jpeg,.png,.jpg"
          beforeUpload={this.beforeUpload}
          customRequest={this.handleImageUpload}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </StyledUpload>
        <StyledModal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </StyledModal>
      </div>
    );
  }
}

export default Upload2;
