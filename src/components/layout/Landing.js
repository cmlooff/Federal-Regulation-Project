import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>The Petitionist</h1>
          <p className='lead'>
            Create a petition, save & share your formats, and change the
            government through action
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/petition' className='btn btn-primary2'>
              Create a Petition
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
