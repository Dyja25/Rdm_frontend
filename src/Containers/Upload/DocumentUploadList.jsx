

import React, { useMemo, useState, useEffect } from "react";
import { Drawer, Button, Select, DatePicker, Progress, Upload, message, Space, Modal } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { getUploadedList, addUpload } from "../Dashboard/DashboardAction";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import DocumentUpload from "../../Components/Forms/Formik/DocumentUpload";

const { Option } = Select;

const initialData = [
  {
    id: 1,
    file: "FILE 1",
    type: "XLS",
    country: "Singapore",
    location: "315 Batram Road",
    uploadedOn: dayjs().subtract(0, "day").toISOString(),
    quality: 95,
    details: [
      { emissionDate: "15-10-2025", sourceType: "Stationary Combustion", fuelType: "Natural Gas", equipId: "BOIL-001", quantityUSed: "1200", unit: "m3" },
      { emissionDate: "16-10-2025", sourceType: "Mobile Combustion", fuelType: "Diesel", equipId: "CAR_123", quantityUSed: "40", unit: "L" }
    ],
  },
  {
    id: 2,
    file: "FILE 2",
    type: "CSV",
    country: "Malaysia",
    location: "12 Jalan Bukit",
    uploadedOn: dayjs().subtract(3, "day").toISOString(),
    quality: 97,
    details: [
      { emissionDate: "15-10-2025", sourceType: "Stationary Combustion", fuelType: "Natural Gas", equipId: "BOIL-001", quantityUSed: "1200", unit: "m3" },
      { emissionDate: "16-10-2025", sourceType: "Mobile Combustion", fuelType: "Diesel", equipId: "CAR_123", quantityUSed: "40", unit: "L" }
    ],
  },
  {
    id: 3,
    file: "FILE 3",
    type: "CSV",
    country: "Indonesia",
    location: "Jl. Sudirman",
    uploadedOn: dayjs().subtract(40, "day").toISOString(),
    quality: 100,
    details: [
      { emissionDate: "15-10-2025", sourceType: "Stationary Combustion", fuelType: "Natural Gas", equipId: "BOIL-001", quantityUSed: "1200", unit: "m3" },
      { emissionDate: "16-10-2025", sourceType: "Mobile Combustion", fuelType: "Diesel", equipId: "CAR_123", quantityUSed: "40", unit: "L" }
    ],
  },
];

function DocumentUploadList(props) {
  const [data, setData] = useState(initialData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeRange, setActiveRange] = useState("TODAY");
  const [modalData, setModalData] = useState(null);
  const [drawerUploadOpen, setDrawerUploadOpen] = useState(false);

  useEffect(() => {
    props.getUploadedList();
  }, []);

  const filtered = useMemo(() => {
    const now = dayjs();
    return data.filter((row) => {
      const d = dayjs(row.uploadedOn);
      if (activeRange === "TODAY") return d.isSame(now, "day");
      if (activeRange === "WTD") return d.isSame(now, "week");
      if (activeRange === "MTD") return d.isSame(now, "month");
      if (activeRange === "YTD") return d.isSame(now, "year");
      return true;
    });
  }, [data, activeRange]);

  const openAddDrawer = () => setDrawerOpen(true);
  const closeAddDrawer = () => setDrawerOpen(false);

  const openAddUploadDrawer = () => setDrawerUploadOpen(true);
  const closeUploadDrawer = () => setDrawerUploadOpen(false);

  const handleAdd = (values, { resetForm }) => {
    const newItem = {
      id: Date.now(),
      file: values.file || `FILE ${data.length + 1}`,
      type: values.type,
      country: values.country,
      location: values.location,
      uploadedOn: values.uploadedOn ? values.uploadedOn.toISOString() : dayjs().toISOString(),
      quality: Number(values.quality) || 0,
      details: [],
    };
    props.addUpload(newItem);
    setData((prev) => [newItem, ...prev]);
    message.success("File added");
    resetForm();
    closeAddDrawer();
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="border border-black rounded-sm">
        <div className="flex items-center justify-between px-8 py-6">
          <h1 className="text-2xl font-bold">FILE UPLOAD</h1>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              {['TODAY', 'WTD', 'MTD', 'YTD'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveRange(t)}
                  className={`px-4 py-2 text-sm font-semibold ${activeRange === t ? 'border-b-2 border-black' : 'text-gray-600'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <Space>
              <Button
                className="bg-[#A7C7E7]"
                onClick={openAddDrawer} icon={<PlusOutlined />} type="default">
                ADD
              </Button>

              <Button
                onClick={openAddUploadDrawer}
                icon={<UploadOutlined />}
                className="bg-red-700"
              >
                UPLOAD
              </Button>
            </Space>
          </div>
        </div>

        <div className="px-16 py-12">
          {/* Plain HTML table replacing AntD Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">File</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Country</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Uploaded On</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Quality</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      No files in this range
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <button className="text-blue-600 underline" onClick={() => setModalData(row)}>
                          {row.file}
                        </button>
                      </td>
                      <td className="px-6 py-4">{row.type}</td>
                      <td className="px-6 py-4">{row.country}</td>
                      <td className="px-6 py-4">{row.location}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 underline" onClick={() => setModalData(row)}>
                          {dayjs(row.uploadedOn).format("D/M/YY")}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Progress
                            percent={row.quality}
                            size="small"
                            strokeWidth={8}
                            style={{ width: 80 }}
                            status={row.quality === 100 ? "success" : row.quality >= 95 ? "normal" : "exception"}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawer for adding new file */}
      <Drawer title="Add File" placement="right" onClose={closeAddDrawer} open={drawerOpen} width={420}>
        <Formik
          initialValues={{ file: "", type: "CSV", country: "", location: "", uploadedOn: dayjs(), quality: 95 }}
          onSubmit={handleAdd}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">File name</label>
                <Field name="file" placeholder="File name" className="mt-1 w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium">Type</label>
                <Select value={values.type} onChange={(v) => setFieldValue('type', v)} className="w-full mt-1">
                  <Option value="CSV">CSV</Option>
                  <Option value="XLS">XLS</Option>
                  <Option value="XLSX">XLSX</Option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium">Country</label>
                <Field name="country" placeholder="Country" className="mt-1 w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium">Location</label>
                <Field name="location" placeholder="Location" className="mt-1 w-full border p-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium">Uploaded On</label>
                <DatePicker
                  value={values.uploadedOn ? dayjs(values.uploadedOn) : dayjs()}
                  onChange={(d) => setFieldValue('uploadedOn', d)}
                  className="w-full mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Quality (%)</label>
                <Field name="quality" type="number" className="mt-1 w-full border p-2 rounded" />
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={closeAddDrawer} className="mr-2">
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Drawer>

      {/* Modal for showing file details */}
      <Drawer
        width={"60em"}
        open={!!modalData}
        onClose={() => setModalData(null)}
        footer={null}
        title={`${modalData?.file || ''} - ${modalData ? dayjs(modalData.uploadedOn).format('D/M/YY') : ''}`}
      >
        {modalData && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Emission Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Source Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Fuel Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Equipment Id</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Quantity Used</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Unit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modalData.details.map((d, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">{d.emissionDate}</td>
                    <td className="px-6 py-4">{d.sourceType}</td>
                    <td className="px-6 py-4">{d.fuelType}</td>
                    <td className="px-6 py-4">{d.equipId}</td>
                    <td className="px-6 py-4">{d.quantityUSed}</td>
                    <td className="px-6 py-4">{d.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Drawer>

      <Drawer
        title="Upload File"
        destroyOnClose
        placement="right"
        onClose={closeUploadDrawer}
        open={drawerUploadOpen}
        width="47em"
      >
        <DocumentUpload />
      </Drawer>
    </div>
  );
}

const mapStateToProps = ({ customer, dashboard, auth, candidate }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUploadedList,
      addUpload
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUploadList);





