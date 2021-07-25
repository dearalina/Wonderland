import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; // Connect this component to redux, needs to be exported
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// import axios from 'axios';

// props => {(setAlert)}

const Register = ({ setAlert, register, isAuthenticated }) => {
  // State: formData(an object with all the fields' values), function used to update, default values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // Pull out data from formData
  const { name, email, password, password2 } = formData;

  // Change the [attribute] to the value of input for each field
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect after registration
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-cat' /> All the best people are mad
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Your username'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Your email address'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-dark' value='Register' />
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired, // ptfr
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool, // ptb
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// connect takes in state(to be mapped), object with action to be used
// allows to access props.setAlert
export default connect(mapStateToProps, { setAlert, register })(Register);
