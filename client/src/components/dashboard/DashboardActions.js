import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <Link to='/edit-profile' class='btn btn-dark adjustbtn'>
        <i class='far fa-edit'></i> Edit Profile
      </Link>
      <Link to='/add-education' class='btn btn-dark'>
        <i class='fas fa-university'></i> Add Education
      </Link>
      <Link to='/add-experience' class='btn btn-dark'>
        <i class='fas fa-briefcase'></i> Add Experience
      </Link>
    </div>
  );
};

export default DashboardActions;
