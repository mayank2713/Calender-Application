import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Notification.css'; // External CSS file for styling

const Notification = () => {
  const [overdue, setOverdue] = useState([]);
  const [today, setToday] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await axios.get('http://localhost:5000/api/communications');
      const now = new Date().toISOString().split('T')[0];
      setOverdue(data.filter((comm) => new Date(comm.date) < new Date(now)));
      setToday(data.filter((comm) => new Date(comm.date).toISOString().split('T')[0] === now));
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <div className="notification-layout">
        {/* Overdue Communications Section */}
        <div className="notification-section">
          <h3 className="section-header overdue-header">Overdue Communications</h3>
          {overdue.length ? (
            <ul className="notification-list">
              {overdue.map((comm) => (
                <li key={comm._id} className="notification-item">
                  <span className="comm-type">{comm.type}</span>
                  <span className="comm-date">{new Date(comm.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-notifications">No overdue communications.</p>
          )}
        </div>

        {/* Today's Communications Section */}
        <div className="notification-section">
          <h3 className="section-header today-header">Today's Communications</h3>
          {today.length ? (
            <ul className="notification-list">
              {today.map((comm) => (
                <li key={comm._id} className="notification-item">
                  <span className="comm-type">{comm.type}</span>
                  <span className="comm-date">{new Date(comm.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-notifications">No communications for today.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
