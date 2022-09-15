import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePetition } from '../../actions/profile';

const Petition = ({ petition, deletePetition }) => {
  const petitions = petition.map((pet) => (
    <tr key={pet._id}>
      <td>{pet.interests}</td>
      <td>{pet.actionType}</td>
      <td>{pet.actionPurpose}</td>
      <td>{pet.actionChanges}</td>
      <td>{pet.actionInterest}</td>
      <td>{pet.actionSupport}</td>
      <td>
        <button
          onClick={() => deletePetition(pet._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Petitions</h2>
      <table className='table'>
        <thead>
          <tr>
            {/* Company, title, years, years */}
            <th>Federal Agency</th>
            <th>Type of Regulation</th>
            <th>Purpose</th>
            <th>Changes</th>
            <th>Public Interest</th>
            <th>Support Links</th>
          </tr>
        </thead>
        {/* Have to loop through data and format */}
        <tbody>{petitions}</tbody>
      </table>
    </Fragment>
  );
};

Petition.propTypes = {
  petition: PropTypes.array.isRequired,
  deletePetition: PropTypes.func.isRequired
};

export default connect(null, deletePetition)(Petition);
