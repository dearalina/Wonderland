import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2 addbg'>
      <img className='round-img' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status}
        {company && <span> at {company}</span>}
      </p>

      <p>
        <i class='fas fa-map-marker-alt'></i>{' '}
        {location && <span>{location}</span>}
      </p>

      <div className='icons'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe' />
          </a>
        )}
        {social && social.github && (
          <a href={social.github} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-github' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin-in'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
