import React from "react";
import { message, Upload } from "antd";
import InboxIcon from '@mui/icons-material/Inbox';
import { base_url } from "../../../Config/Auth";
import axios from "axios";
import pako from "pako"; // For GZIP compression
import imageCompression from "browser-image-compression"; // For image compression and WebP conversion
const { Dragger } = Upload;
const token = sessionStorage.getItem("token");

class DraggableUpload1 extends React.Component {
    state = {
        previewVisible: false,
        previewImage: "",
        fileList: [],
         uploadSuccess: false,
    };
    beforeUpload = file => {
        const isLt2M = file.size / 1024 / 1024 < 25;

        if (!isLt2M) {
            message.error("Image size must be smaller than 25MB!");
            file.flag = true;
            return false;
        }
    };
     handleDocumentUpload = async ({ onSuccess, onError, file }) => {
       try {
         console.log("Original File:", file);
   
         let compressedFile;
   
         if (file.type.startsWith("image/")) {
           // Compress and convert images to WebP
           console.log("Compressing image to WebP...");
           compressedFile = await imageCompression(file, {
             maxSizeMB: 2, // Target maximum size in MB
             maxWidthOrHeight: 1920, // Resize if larger than this
             fileType: "image/webp", // Convert to WebP
           });
           console.log("Compressed Image Size:", compressedFile.size, "bytes");
         } else {
           // Compress other files to GZIP
           console.log("Compressing file to GZIP...");
           const fileData = await file.arrayBuffer();
           const compressedData = pako.gzip(new Uint8Array(fileData));
           compressedFile = new Blob([compressedData], { type: "application/gzip" });
           compressedFile.name = `${file.name}.gz`;
           console.log("Compressed GZIP Size:", compressedData.byteLength, "bytes");
         }
   
         // Prepare form data
         const formData = new FormData();
         formData.append("file", compressedFile, compressedFile.name);
   
         console.log("Form Data Prepared:", formData);
   
         // Send to server
         const response = await axios.post(`${base_url}/document/upload`, formData, {
           headers: {
             "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`,
           },
         });
   
         console.log("Server Response:", response);
         onSuccess();
         this.props.form.setFieldValue(this.props.field.name, response.data);
         this.setState({ uploadSuccess: true });
       } catch (error) {
         console.error("Error during compression/upload:", error);
         onError();
       }
     };
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };

    handleChange = ({ fileList, file }) => {
        console.log(fileList);
        console.log(file);
        if (file.flag === true) {
            return this.setState({ fileList: [] });
        }

        this.setState({ fileList });
    };
    render() {
        const { fileList } = this.state;
        return (
            <div className="clearfix">
                <Dragger
                    customRequest={this.handleDocumentUpload}
                    beforeUpload={this.beforeUpload}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    <p className="ant-upload-drag-icon">
                        {/* <Icon type="inbox" /> */}
                         < InboxIcon  className="!text-icon" />
                    </p>
                    <p className="ant-upload-text">

                        Click or drag file to this area to upload
                    </p>
                </Dragger>
            </div>
        );
    }
}

export default DraggableUpload1;
