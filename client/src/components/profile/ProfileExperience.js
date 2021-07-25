import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div>
      {!company ? '' : <h3>{company}</h3>}
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? ' Now ' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>{!title ? '' : <strong>Position: {title}</strong>}</p>
      <p>{!description ? '' : <strong>Description: {description} </strong>}</p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
