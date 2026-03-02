import React, { useMemo, useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { getInfo } from "../Dashboard/DashboardAction";
import { bindActionCreators } from "redux";

const { Title, Text } = Typography;

const companyData = [
  { title: "Company Name", value: "Tech Solutions Inc." },
  { title: "Founded", value: "2010" },
  { title: "Employees", value: "250+" },
  { title: "Industry", value: "Software Development" },
];

const additionalDetails = {
  description:
    "Tech Solutions Inc. is a leading software company providing innovative solutions across multiple industries. Our mission is to drive digital transformation and help businesses achieve their goals.",
  address: "123 Silicon Valley, San Francisco, CA, USA",
  revenue: "$15M",
  ceo: "Jane Doe",
};

const Info = (props) => {
    useEffect(() => {
      props.getInfo();
    }, []);
  return (
    <div style={{ padding: 30 }}>
      <Row gutter={30}>
        {/* Left Side: Info Boxes */}
        <Col xs={24} md={12}>
          {companyData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              style={{ marginBottom: 20 }}
            >
              <Card hoverable>
                <Title level={5}>{item.title}</Title>
                <Text>{item.value}</Text>
              </Card>
            </motion.div>
          ))}
        </Col>

        {/* Right Side: Additional Details */}
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card title="Company Details" hoverable>
              <Title level={5}>Description</Title>
              <Text>{additionalDetails.description}</Text>

              <div style={{ marginTop: 15 }}>
                <Title level={5}>Address</Title>
                <Text>{additionalDetails.address}</Text>
              </div>

              <div style={{ marginTop: 15 }}>
                <Title level={5}>Revenue</Title>
                <Text>{additionalDetails.revenue}</Text>
              </div>

              <div style={{ marginTop: 15 }}>
                <Title level={5}>CEO</Title>
                <Text>{additionalDetails.ceo}</Text>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ customer, dashboard, auth, candidate }) => ({
  infoListData:dashboard.infoListData
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInfo,
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Info);


