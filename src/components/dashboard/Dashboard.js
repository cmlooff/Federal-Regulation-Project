/**
 * Where we're going to fetch our data through an action -> So that we get our data from the redux state
 */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Petitions from './Petitions';
import Spinner from '../layout/Spinner';

// This are being passed in as our props -> getCurrentProfile, auth, profiles
const Dashboard = ({
  getCurrentProfile,
  // Our auth has our user data
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  // If Loading is true (by default) AND profile is null (Not loaded) then run Spinner
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Petitionist</h1>
      {/* user && user.name is checking if the user exists, if they do then put the name here */}
      <p className='lead'>
        <i className='fas fa-user-astronaut'></i> Welcome {user && user.name}
      </p>
      {/* Check to see if profile is !== null -> A profile exists for the user*/}
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {/* <Experience experience={profile.experience} /> */}
          {/* <Petitions petition={profile.petitions} /> */}
        </Fragment>
      ) : (
        <Fragment>
          <Fragment>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
          <Fragment>
            <p>You do not have any petitions saved - start petitioning!</p>
            <Link to='/add-petition' className='btn btn-primary2 my-1'>
              Create Petition
            </Link>
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

// Changing our state into props
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
