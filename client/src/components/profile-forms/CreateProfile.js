import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    github: '',
    linkedin: '',
    instagram: '',
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    github,
    linkedin,
    instagram,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <form className='form1' onSubmit={e => onSubmit(e)}>
        <h1 className='large text-primary'>Create your profile</h1>
        <p className='lead'>
          <i className='fas fa-cat'></i> Welcome!
        </p>

        <div className='form'>
          <small className='form-text'>Current School/Company</small>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <small className='form-text'>Personal Website</small>
          <input
            type='text'
            placeholder='Website URL'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <small className='form-text'>Location</small>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <small className='form-text'>Current Status</small>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option value='0'>Select professional status</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Intern'>Intern</option>
            <option value='Student'>Student</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        <div className='form'>
          <small className='form-text'>Tech Stack</small>
          <input
            type='text'
            placeholder='Java, C++, Python, HTML, CSS, JavaScript... '
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <small className='form-text'>Github Username</small>
          <input
            type='text'
            name='githubusername'
            placeholder='Github username'
            value={githubusername}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form'>
          <small className='form-text'>Bio</small>
          <textarea
            name='bio'
            placeholder='A short bio for yourself'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
        </div>

        <div>
          <button
            className='btn btn-dark adjustbtn'
            type='button'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add SNS Links
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form social-input'>
              <i className='fab fa-github'></i>
              <input
                type='text'
                placeholder='Github URL'
                name='github'
                value={github}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form social-input'>
              <i className='fab fa-linkedin'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form social-input'>
              <i className='fab fa-instagram'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
