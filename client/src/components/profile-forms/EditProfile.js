import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading }, // profile state
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
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
    bio,
    githubusername,
    github,
    linkedin,
    instagram,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      github: loading || !profile.social ? '' : profile.social.github,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    });
  }, [
    loading,
    getCurrentProfile,
    profile.bio,
    profile.company,
    profile.githubusername,
    profile.location,
    profile.skills,
    profile.social,
    profile.status,
    profile.website,
  ]); //when use useEffect it will keep reloading; use[loading]

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <form className='form1' onSubmit={e => onSubmit(e)}>
        <h1 className='large text-primary'>Create your profile</h1>
        <p className='lead'>
          <i className='fas fa-cat'></i> Welcome!
        </p>

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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
