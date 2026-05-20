import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

const EmailSendForm = () => {
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    body: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmailData({ ...emailData, attachment: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email sent:", emailData);
    setEmailData({
      recipient: "",
      subject: "",
      body: "",
      attachment: null,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Compose Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {/* Recipient: */}
            <FormattedMessage
          id="app.recipient"
          defaultMessage="Recipient"
        />:
            </label>
          <input
            type="email"
            name="recipient"
            value={emailData.recipient}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {/* Subject: */}
             <FormattedMessage
          id="app.subject"
          defaultMessage="Subject"
        />:
            </label>
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {/* Body: */}
             <FormattedMessage
          id="app.body"
          defaultMessage="Body"
        />:
            </label>
          <textarea
            name="body"
            value={emailData.body}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {/* Attachment: */}
            <FormattedMessage
          id="app.attachment"
          defaultMessage="Attachment"
        />:
            </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-700 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* Send Email */}
             <FormattedMessage
          id="app.sendEmail"
          defaultMessage="Send Email"
        />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailSendForm;
