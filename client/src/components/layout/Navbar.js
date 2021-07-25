import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // impt
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fab fa-github-alt'></i> Community
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fab fa-telegram-plane'></i> Posts
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user-astronaut'></i> Dashboard
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i> Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fab fa-github-alt'></i> Community
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='fas fa-user-plus'></i> Register
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fas fa-user-astronaut'></i> Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fab fa-fort-awesome'></i> Alina's Wonderland
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, // ptor
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
