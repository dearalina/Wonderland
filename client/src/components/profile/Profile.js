import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='adjustbtn'>
            <Link className='btn btn-danger adjustbtn' to='/dashboard'>
              Go Back
            </Link>

            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark adjustbtn'>
                  <i class='far fa-edit'></i> Edit Profile
                </Link>
              )}
          </div>
          <div className='profile-container'>
            <div className='profile-grid my-1'>
              {/* Top */}
              <ProfileTop profile={profile} />
              {/* About */}
              <ProfileAbout profile={profile} />
              {/* Experience */}
              <div className='profile-exp p-2 addbg'>
                <h2 class='text-primary adjusttitle'>Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map(experience => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <p>No experience credentials</p>
                )}
              </div>
              {/* Education */}
              <div className='profile-edu p-2 addbg'>
                <h2 class='text-primary adjusttitle'>Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map(education => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <p>No education credentials</p>
                )}
              </div>
              {/* Github Repos */}

              {profile.githubusername && (
                <ProfileGithub username={profile.githubusername} />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth, // If logged in, the user can edit profile
});

export default connect(mapStateToProps, { getProfileById })(Profile);
