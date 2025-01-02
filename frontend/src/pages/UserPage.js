import React, { useState } from 'react';
import Dashboard from '../components/User/Dashboard';
import CalendarView from '../components/User/CalendarView';
import Notification from '../components/User/Notifications';
import CommunicationModal from '../components/User/CommunicationModal';
import '../components/styles/userPage.css';

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCommunicationLogged = (communication) => {
    // You can update the state or perform actions based on the logged communication
    console.log('Communication logged:', communication);
  };

  return (
    <div className="user-page">
      <header className="user-page-header">
        <h1>User Dashboard</h1>
        <p>Welcome to your personalized dashboard. Manage notifications, communications, and schedules in one place.</p>
      </header>

      <main className="user-page-main">
        <section className="user-section notifications">
          <h2>Notifications</h2>
          <Notification />
        </section>

        <section className="user-section dashboard">
          <div className="dashboard-header">
            <h2>Company Overview</h2>
            <button className="open-modal-button" onClick={handleOpenModal}>
              Log Communication
            </button>
          </div>
          <Dashboard />
        </section>

        <section className="user-section calendar">
          <h2>Communication Calendar</h2>
          <CalendarView />
        </section>
      </main>

      <footer className="user-page-footer">
        <p>© 2024 Communication Management Platform. All rights reserved.</p>
      </footer>

      {/* Communication Modal */}
      {isModalOpen && (
        <CommunicationModal
          companyId="selected-company-id" // Replace with dynamic company ID as needed
          onClose={handleCloseModal}
          onCommunicationLogged={handleCommunicationLogged}
        />
      )}
    </div>
  );
};

export default UserPage;
