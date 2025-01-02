import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CompanyForm.css'; // External CSS file

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: '2 weeks'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/companies', formData);
    alert('Company added successfully');
    setFormData({
      name: '',
      location: '',
      linkedInProfile: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      communicationPeriodicity: '2 weeks'
    });
  };

  return (
    <div className="form-container">
      <h2>Add a Company</h2>
      <form className="company-form" onSubmit={handleSubmit}>
        <label>
          Company Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter the company name"
            required
          />
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the location"
          />
        </label>
        <label>
          LinkedIn Profile
          <input
            type="url"
            name="linkedInProfile"
            value={formData.linkedInProfile}
            onChange={handleChange}
            placeholder="Enter LinkedIn profile URL"
          />
        </label>
        <label>
          Emails
          <input
            type="text"
            name="emails"
            value={formData.emails}
            onChange={handleChange}
            placeholder="Enter emails (comma-separated)"
          />
        </label>
        <label>
          Phone Numbers
          <input
            type="text"
            name="phoneNumbers"
            value={formData.phoneNumbers}
            onChange={handleChange}
            placeholder="Enter phone numbers (comma-separated)"
          />
        </label>
        <label>
          Comments
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Add any comments or notes"
          />
        </label>
        <label>
          Communication Periodicity
          <select
            name="communicationPeriodicity"
            value={formData.communicationPeriodicity}
            onChange={handleChange}
          >
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="1 month">1 month</option>
          </select>
        </label>
        <button type="submit" className="submit-button">
          Add Company
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
