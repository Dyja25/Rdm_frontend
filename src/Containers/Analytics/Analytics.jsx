import React from "react";
import { Row, Col, Card } from "antd";
import {
  LineChart, Line,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, Cell,
  AreaChart, Area,
} from "recharts";

const Analytics = () => {
  // Sample Data
  const lineData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4000 },
    { month: "May", revenue: 6000 },
  ];

  const barData = [
    { region: "North", sales: 2400 },
    { region: "South", sales: 1398 },
    { region: "East", sales: 9800 },
    { region: "West", sales: 3908 },
  ];

  const pieData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 300 },
    { name: "Product D", value: 200 },
  ];

  const areaData = [
    { month: "Jan", growth: 1000 },
    { month: "Feb", growth: 2000 },
    { month: "Mar", growth: 1500 },
    { month: "Apr", growth: 3000 },
    { month: "May", growth: 2500 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]}>
        {/* Line Chart */}
        <Col xs={24} md={12}>
          <Card title="Monthly Revenue">
            <LineChart width={400} height={250} data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </Card>
        </Col>

        {/* Bar Chart */}
        <Col xs={24} md={12}>
          <Card title="Sales by Region">
            <BarChart width={400} height={250} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>

        {/* Pie Chart */}
        <Col xs={24} md={12}>
          <Card title="Market Share">
            <PieChart width={400} height={250}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>

        {/* Area Chart */}
        <Col xs={24} md={12}>
          <Card title="Growth Trend">
            <AreaChart width={400} height={250} data={areaData}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="growth" stroke="#8884d8" fillOpacity={1} fill="url(#colorGrowth)" />
            </AreaChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
