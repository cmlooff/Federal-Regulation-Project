import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Commence = (props) => {
  const [petitionData, setPetitionData] = useState({
    name: '',
    email: '',
    address: '',
    interests: '',
    actionType: '',
    actionPurpose: '',
    actionChanges: '',
    actionInterest: '',
    actionSupport: ''
  });

  // Destructure
  const {
    name,
    email,
    address,
    interests,
    actionType,
    actionPurpose,
    actionChanges,
    actionInterest,
    actionSupport
  } = petitionData;

  return (
    <Fragment>
      <div className='commence page'>
        <h1 className='large text-danger'>Time to Regulate!</h1>
        <p className='lead'>
          <i className='fas fa-eraser'></i> Fill in some easy details to start
          Regulating
        </p>
        <form className='form'>
          {/* Regulatory Departments */}
          <div className='form-group'>
            <select name='interests'>
              <option value='0'>* Select Regulatory Target</option>
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
              Select a Department you want to assault (regulation-wise){' '}
              <i className='fas fa-pen-nib'></i>
            </small>
          </div>

          {/* Regulatory ActionType */}
          <div className='form-group'>
            <select name='actionType'>
              <option value='Regulate'>Regulate</option>
            </select>
            <small className='form-text'>
              You've chosen... wisely <i className='fas fa-mug-hot'></i>
            </small>
          </div>

          {/* ActionPurpose */}
          <div className='form-group'>
            <textarea
              placeholder='State your purpose for regulating...'
              name='actionPurpose'
            ></textarea>
            <small className='form-text'>
              Keep it short, big brain <i className='fas fa-brain'></i>
            </small>
          </div>

          {/* ActionChanges */}
          <div className='form-group'>
            <textarea
              placeholder='What are you wanting to regulate?'
              name='actionChanges'
            ></textarea>
            <small className='form-text'>
              Do you want to allow cats to become President?{' '}
              <i className='fas fa-cat'></i> Or just a Vice President?
            </small>
          </div>

          {/* actionInterest */}
          <div className='form-group'>
            <textarea
              placeholder='How will this affect people?'
              name='actionInterest'
            ></textarea>
            <small className='form-text'>
              If we regulate this rule, will it inhibit my need for burgers?{' '}
              <i className='fas fa-burger'></i>
            </small>
          </div>

          {/* actionSupport */}
          <div className='form-group'>
            <textarea
              placeholder='Time to list your evidence!'
              name='actionSupport'
            ></textarea>
            <small className='form-text'>
              Now this is rulemaking! <i className='fas fa-jedi'></i>
            </small>
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <a href='/petition' className='btn btn-primary2'>
            Top of Page
          </a>
        </form>
      </div>
    </Fragment>
  );
};

Commence.propTypes = {};

export default Commence;
