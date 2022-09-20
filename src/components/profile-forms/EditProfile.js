import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // WithRouter allows us to redirect within an action
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Implementing actions
import { createProfile, getCurrentProfile } from '../../actions/profile';
import profile from '../../reducers/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    title: '',
    interests: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  useEffect(() => {
    getCurrentProfile();
    // Set the form data with the current values
    setFormData({
      title: loading || !profile.title ? '' : profile.title,
      interests:
        loading || !profile.interests ? '' : profile.interests.join(','),
      bio: loading || !profile.bio ? '' : profile.bio
    });
    // The prop that I want to depend on is loading
  }, [loading]);

  // const [displaySocialInputs, toggleSocial] = useState(false);

  // Destructure
  const {
    company,
    website,
    location,
    title,
    interests,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  // * ADDED
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Peticient Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's edit your profile!
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='interests'
            // * ADDED
            value={interests}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Regulatory Interests</option>
            <option value='Department of Commerce'>
              Department of Commerce
            </option>
            <option value='Department of Energy'>Department of Energy</option>
            <option value='Department of Justice'>Senior Developer</option>
            <option value='Department of Labor'>Department of Labor</option>
            <option value='Department of Transportation'>
              Department of Transportation
            </option>
            <option value='Environmental Protection Agency'>
              Environmental Protection Agency
            </option>
            <option value='Department of Agriculture'>
              Department of Agriculture
            </option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are want to target your action
          </small>
        </div>
        {/* <div className='form-group'>
          <input type='text' placeholder='Company' name='company' />
          <small className='form-text'>
            What industry are you in?
          </small>
        </div> */}
        {/* <div className='form-group'>
          <input type='text' placeholder='Website' name='website' />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div> */}
        {/* <div className='form-group'>
          <input type='text' placeholder='Location' name='location' />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div> */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Titles'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. Engineer, Lawyer, Designer,
            Musician)
          </small>
        </div>
        {/* <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div> */}
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        {/* <div className='my-2'>
          <button type='button' className='btn btn-light'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x'></i>
          <input type='text' placeholder='Twitter URL' name='twitter' />
        </div> */}

        {/* <div className='form-group social-input'>
          <i className='fab fa-facebook fa-2x'></i>
          <input type='text' placeholder='Facebook URL' name='facebook' />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-youtube fa-2x'></i>
          <input type='text' placeholder='YouTube URL' name='youtube' />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-linkedin fa-2x'></i>
          <input type='text' placeholder='Linkedin URL' name='linkedin' />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-instagram fa-2x'></i>
          <input type='text' placeholder='Instagram URL' name='instagram' />
        </div> */}
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

// Without withRouter we won't be able to redirect with the action
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
