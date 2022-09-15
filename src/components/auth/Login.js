import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  /** State Handling
   * Since this is a form, We need component State
   * Each input has it's own state and needs it's own form handler
   * Our state: formData will be an object with all of the field values
   * Function we'll use to update our state
   */
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  /** onChange Function Notes
   * In setFormData we want to change our state
   * We don't change our data directly
   * We pull from ...forData and then we target what we want to change
   * We can't do name: e.target.value otherwise we'll just be changing only the name key:value
   * So we set it to [e.target.name] so that it is more dynamic -> Changes to name -> email -> password -> etc...
   */
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('SUCCESS');
  };

  return (
    <div className='container'>
      <h1 className='large text-primary'>Sign in</h1>
      <p className='lead'>
        <i className='fa-solid fa-feather-pointed'></i> Sign Into Your Account
      </p>
      {/* Pointing to create-profile.html */}
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          {/* <small class="form-text" >Site uses Gravatar for profile images</small> */}
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength={8}
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
