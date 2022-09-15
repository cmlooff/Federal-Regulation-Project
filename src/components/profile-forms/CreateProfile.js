import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = (props) => {
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

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Peticient Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's create a profile so you can share
        your petitions with others!
      </p>
      <form className='form'>
        <div className='form-group'>
          <select name='interests'>
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
          <input type='text' placeholder='Titles' name='titles' />
          <small className='form-text'>
            Please use comma separated values (eg.
            Engineer,Lawyer,Designer,Musician)
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
          <textarea placeholder='A short bio of yourself' name='bio'></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button type='button' className='btn btn-light'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x'></i>
          <input type='text' placeholder='Twitter URL' name='twitter' />
        </div>

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
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
