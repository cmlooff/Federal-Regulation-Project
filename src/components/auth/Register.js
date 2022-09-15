import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

/** Redux notes
 * We can now throw in props after connecting in the bottom
 */
const Register = ({ setAlert, register }) => {
  /** State Handling
   * Since this is a form, We need component State
   * Each input has it's own state and needs it's own form handler
   * Our state: formData will be an object with all of the field values
   * Function we'll use to update our state
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  /** onChange Function Notes
   * In setFormData we want to change our state
   * We don't change our data directly
   * We pull from ...forData and then we target what we want to change
   * We can't do name: e.target.value otherwise we'll just be changing only the name key:value
   * So we set it to [e.target.name] so that it is more dynamic -> Changes to name -> email -> password -> etc...
   */
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /**onSubmit Function Notes
   * We're preventing default here -> It's a submit button
   *
   * Logic for password matching
   * * This is the neat part of having a state -> Can access state from anywhere from line 11
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      /**Without Redux
       * Using Axios
       * const newUser = {
            name,
            email,
            password
          };
          try {
            const config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            const body = JSON.stringify(newUser);

            const res = await axios.post('/api/users', body, config);

            console.log(res.data);
          } catch (err) {
            console.error(err.response.data);
        }
       */
      register({ name, email, password });
    }
  };

  return (
    <div className='container'>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fa-solid fa-feather-pointed'></i> Create Account
      </p>
      {/* Pointing to create-profile.html */}
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          {/* <small class="form-text" >Site uses Gravatar for profile images</small> */}
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  );
};

Register.PropTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

/** Actions note
 * Whenever we bring in an action and we want to use it, we have to pass it into connect()
 * connect() takes in 2 things -> Any state that we want to map -> AND an object with any actions we want to use
 *
 * This now allows us to use props.setAlert
 */
export default connect(null, { setAlert, register })(Register);
