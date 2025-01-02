import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Import custom styles

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/companies');
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        alert('Failed to load companies. Please try again.');
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Company Communication Dashboard</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Last Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr key={company._id}>
                <td>{company.name}</td>
                <td>
                  <ul>
                    {/* Example of displaying the last 5 communications */}
                    {company.lastCommunications?.slice(0, 5).map((comm, index) => (
                      <li key={index}>
                        {comm.type} on {new Date(comm.date).toLocaleDateString()}
                      </li>
                    )) || <span>No recent communications</span>}
                  </ul>
                </td>
                <td>
                  {company.nextCommunication
                    ? `${company.nextCommunication.type} on ${new Date(
                        company.nextCommunication.date
                      ).toLocaleDateString()}`
                    : 'No scheduled communication'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
