import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommunicationModal = ({ onClose, onCommunicationLogged }) => {
  const [formData, setFormData] = useState({
    companyId: '',
    type: '',
    date: '',
    notes: '',
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/companies');
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { companyId, type, date, notes } = formData;
      if (!companyId || !type || !date) {
        alert('Please fill out all required fields');
        return;
      }
      const communication = { companyId, type, date, notes };
      await axios.post('http://localhost:5000/api/communications', communication);
      alert('Communication logged successfully');
      onCommunicationLogged(communication);
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error logging communication:', error);
      alert('Failed to log communication');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Log Communication</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Select Company
            <select name="companyId" value={formData.companyId} onChange={handleChange} required>
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Type of Communication
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="LinkedIn Post">LinkedIn Post</option>
              <option value="LinkedIn Message">LinkedIn Message</option>
              <option value="Email">Email</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Notes
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional details"
              rows="3"
            />
          </label>
          <button type="submit">Log Communication</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunicationModal;
