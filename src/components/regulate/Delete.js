import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPetition } from '../../actions/profile';

const AddPetition = ({ addPetition, history }) => {
  const [formData, setFormData] = useState({
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

  // const [toDateDisabled, toggleDisabled] = useState(false);
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
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  return (
    <Fragment>
      <div className='delete page'>
        <h1 className='large text-danger'>Time to Deregulate!</h1>
        <p className='lead'>
          <i className='fas fa-eraser'></i> Fill in some easy details to start
          Deregulating!
        </p>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            addPetition(formData);
            // Need to change this to /petition page
            navigate('/petition');
          }}
        >
          {/* Regulatory Departments */}
          <div className='form-group'>
            <select
              name='interests'
              value={interests}
              onChange={(e) => onChange(e)}
            >
              <option value='0'>* Select Regulatory Target</option>
              <option value='Department of Commerce'>
                Department of Commerce
              </option>
              <option value='Department of Energy'>Department of Energy</option>
              <option value='Department of Justice'>
                Department of Justice
              </option>
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
            <select
              name='actionType'
              value={actionType}
              onChange={(e) => onChange(e)}
            >
              <option value='Delete'>Delete</option>
            </select>
            <small className='form-text'>
              You've chosen... wisely <i className='fas fa-mug-hot'></i>
            </small>
          </div>

          {/* ActionPurpose */}
          <div className='form-group'>
            <textarea
              placeholder='State your purpose for deregulating...'
              name='actionPurpose'
              value={actionPurpose}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className='form-text'>
              Keep it short, big brain <i className='fas fa-brain'></i>
            </small>
          </div>

          {/* ActionChanges */}
          <div className='form-group'>
            <textarea
              placeholder='What are you wanting to deregulating?'
              name='actionChanges'
              value={actionChanges}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className='form-text'>
              Will it allow otters to become President?{' '}
              <i className='fas fa-otter'></i> Or just a Chief of Staff?
            </small>
          </div>

          {/* actionInterest */}
          <div className='form-group'>
            <textarea
              placeholder='How will this affect people?'
              name='actionInterest'
              value={actionInterest}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className='form-text'>
              If we deregulate this rule, will it inhibit my need for
              chocolate-flavored mugs?
            </small>
          </div>

          {/* actionSupport */}
          <div className='form-group'>
            <textarea
              placeholder='Time to list your evidence!'
              name='actionSupport'
              value={actionSupport}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className='form-text'>
              Now this is rulemaking! <i className='fas fa-jedi'></i>
            </small>
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link to='/' className='btn btn-primary2'>
            Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

AddPetition.propTypes = {
  addPetition: PropTypes.func.isRequired
};

export default connect(null, { addPetition })(AddPetition);
