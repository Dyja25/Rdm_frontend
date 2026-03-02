// import React from 'react';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import { StyledUpload, StyledModal } from '../../UI/Antd';
// import { base_url } from '../../../Config/Auth';
// import axios from 'axios';
// const token = sessionStorage.getItem('token');

// class DocumentUpload extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     fileList: [],
//     uploadSuccess: false,
//   };

//   handleDocumentUpload = ({ onSuccess, onError, file }) => {
//     console.log(this.props)
//     let formData = new FormData();
//     formData.append('file', file);
//     axios.post(`${base_url}/upload/document`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(res => {
//         console.log(res)
//         onSuccess()
//         this.props.form.setFieldValue(this.props.field.name, res.data)
//         this.setState({ previewVisible: false, previewImage: '', })
//       })
//       .catch(err => {
//         console.log(err)
//         onError()
//       })
//   }
//   handleCancel = () => this.setState({ previewVisible: false })

//   handlePreview = (file) => {
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true,
//     });
//   }

//   handleChange = ({ fileList }) => this.setState({ fileList })
  
//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const uploadButton = (
//       <div>
//       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix">
//         <StyledUpload
//           customRequest={this.handleDocumentUpload}
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 1 ? null : uploadButton}
//         </StyledUpload>
//         <StyledModal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </StyledModal>
//       </div>
//     );
//   }
// }

// export default DocumentUpload;

import React, { useState } from "react";
import { Upload, Table, Select, message, Card, Progress } from "antd";
import {
  InboxOutlined,
  CheckCircleTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { motion } from "framer-motion";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const { Option } = Select;
const { Dragger } = Upload;

const DocumentUpload = ({ type,onMappingChange,token }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [excelId, setExcelId] = useState(null);
  const [fields, setFields] = useState([]);

  // 👉 Fetch fields on dropdown focus
  const fetchFields = async () => {
    try {
      const res = await axios.get(`${base_url}/excel-user/entity/fields/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFields(res.data.fields || []);
    } catch (error) {
      console.error("Failed to fetch fields:", error);
      message.error("Could not load fields");
    }
  };

  const props = {
    name: "file",
    accept: ".xlsx,.xls",
    multiple: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);
      setUploaded(false);
      setProgress(0);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
          `${base_url}/excel-user/import/headers`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (e) => {
              let percent = Math.round((e.loaded / e.total) * 100);
              setProgress(percent);
            },
          }
        );

        const { headers, excelId } = res.data;
        setExcelId(excelId);
        const newData = headers.map((h, index) => ({
          key: index,
          header: h,
          user: null,
        }));
        setTableData(newData);

        setUploaded(true);
        onSuccess("ok");
        message.success("File uploaded successfully");
      } catch (err) {
        console.error(err);
        onError(err);
        message.error("Upload failed");
      } finally {
        setLoading(false);
      }
    },
  };

  const handleUserChange = (value, record) => {
    const updated = tableData.map((row) =>
      row.key === record.key ? { ...row, user: value } : row
    );
    setTableData(updated);

    // 👉 notify parent with latest mappings
    if (onMappingChange) {
      const mappings = updated.map((row) => ({
        header: row.header,
        userId: row.user,
      }));
      onMappingChange(excelId, mappings);
    }
  };

  const columns = [
    {
      title: "Excel Header",
      dataIndex: "header",
    },
    {
      title: " ",
      dataIndex: "user",
     render: (_, record) => {
      // collect all selected fields
      const selectedValues = tableData
        .filter((row) => row.user && row.key !== record.key) // exclude current row
        .map((row) => row.user);
            const sortedFields = [...fields].sort((a, b) => a.localeCompare(b));

      return (
        <Select
          style={{ width: 200 }}
          placeholder="Select field"
          value={record.user}
          onFocus={fetchFields}
          onChange={(value) => handleUserChange(value, record)}
          loading={fields.length === 0}
          showSearch
            optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
        >
          {fields.map((field) => (
            <Option
              key={field}
              value={field}
              disabled={selectedValues.includes(field)} // 🚫 disable if already chosen
            >
              {field}
            </Option>
          ))}
        </Select>
      );
    },
    },
  ];

  return (
    <Card
      title=""
      bordered={false}
      style={{
        borderRadius: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Dragger {...props} showUploadList={false} style={{ borderRadius: "15px" }}>
          <p className="ant-upload-drag-icon">
            {loading ? (
              <LoadingOutlined style={{ fontSize: 40, color: "#1890ff" }} spin />
            ) : uploaded ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 40 }} />
            ) : (
              <InboxOutlined style={{ fontSize: 40, color: "#fa8c16" }} />
            )}
          </p>
          <p className="ant-upload-text" style={{ fontSize: "16px", fontWeight: 500 }}>
            {loading ? "Uploading..." : "Drag & Drop or Click to Upload Excel"}
          </p>
          <p className="ant-upload-hint" style={{ fontSize: "13px", color: "#888" }}>
            Supports .xlsx and .xls files
          </p>
        </Dragger>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ marginTop: 20 }}>
            <Progress
              percent={progress}
              status={progress === 100 ? "success" : "active"}
              strokeColor={{ from: "#108ee9", to: "#87d068" }}
            />
          </motion.div>
        )}

        {uploaded && excelId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 20,
              padding: "10px 15px",
              borderRadius: "10px",
              background: "#f6ffed",
              border: "1px solid #b7eb8f",
              color: "#389e0d",
              textAlign: "center",
            }}
          >
            🎉 Upload complete! Excel ID: <b>{excelId}</b>
          </motion.div>
        )}
      </motion.div>

      {tableData.length > 0 && (
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          bordered
          style={{ marginTop: 20 }}
        />
      )}
    </Card>
  );
};

const mapStateToProps = ({
  auth,
 
}) => ({
  
  token: auth.token,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DocumentUpload);
