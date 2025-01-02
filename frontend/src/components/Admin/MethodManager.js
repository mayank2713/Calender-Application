import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MethodManager.css'; // External CSS file for styling

const MethodManager = () => {
  const [methods, setMethods] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', sequence: '', mandatory: false });

  useEffect(() => {
    const fetchMethods = async () => {
      const { data } = await axios.get('http://localhost:5000/api/methods');
      setMethods(data);
    };
    fetchMethods();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/methods', formData);
    alert('Method added successfully');
    setFormData({ name: '', description: '', sequence: '', mandatory: false });
    setMethods((prev) => [...prev, formData]);
  };

  return (
    <div className="method-manager-container">
      <h2>Manage Communication Methods</h2>
      <div className="method-layout">
        {/* Form Section */}
        <form className="method-form" onSubmit={handleSubmit}>
          <label>
            Method Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter method name"
              required
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a brief description"
            />
          </label>
          <label>
            Sequence
            <input
              type="number"
              name="sequence"
              value={formData.sequence}
              onChange={handleChange}
              placeholder="Enter sequence number"
              required
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="mandatory"
              checked={formData.mandatory}
              onChange={handleChange}
            />
            Mandatory
          </label>
          <button type="submit" className="submit-button">Add Method</button>
        </form>

        {/* Methods List Section */}
        <div className="method-list-container">
          <h3>Existing Methods</h3>
          <ul className="method-list">
            {methods.map((method) => (
              <li key={method._id} className="method-item">
                <strong>{method.name}</strong> - Sequence: {method.sequence}, Mandatory: {method.mandatory ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MethodManager;
