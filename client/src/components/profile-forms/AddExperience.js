import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <Fragment>
      <form action='' className='form1' onSubmit={e => onSubmit(e)}>
        <h1 className='large text-primary'>Add an Experience</h1>
        <p className='lead'></p>

        <div className='form'>
          <small className='form-text'>Company</small>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <small className='form-text'>Job title</small>
          <input
            type='text'
            placeholder='Job title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <small className='form-text'>Work Location</small>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <small className='form-text'>From Date</small>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>

        <div className='form'>
          <small className='form-text'>To Date</small>
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>

        <div className='form'>
          <small className='form-text'>Description</small>
          <textarea
            placeholder='Job description'
            cols='30'
            rows='5'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>

        <div className='adjustbtn'>
          <input
            type='submit'
            value='Submit'
            className='btn btn-dark adjustbtn'
          />
          <Link className='btn btn-danger adjustbtn' to='/dashboard'>
            Go Back
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
