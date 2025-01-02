import React from 'react';
import CompanyForm from '../components/Admin/CompanyForm';
import MethodManager from '../components/Admin/MethodManager';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CompanyForm />
      <MethodManager />
    </div>
  );
};

export default AdminPage;
