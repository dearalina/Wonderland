import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }, // Pull out profile state & loading
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='adjustcontainer'>
        <h1 className='large text-primary'>
          <i className='fas fa-user-astronaut'></i> Dashboard
        </h1>
        <p className='lead'>Welcome {user && user.name}!</p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Education education={profile.education} />
            <Experience experience={profile.experience} />
            <div>
              <button
                className='btn btn-danger adjustbtn'
                onClick={() => deleteAccount()}
              >
                Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p className='lead'>
              <i className='far fa-smile-wink' />
              You haven't yet set up your profile, please add some info!
            </p>
            <Link to='/create-profile' className='btn btn-dark adjustbtn'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
