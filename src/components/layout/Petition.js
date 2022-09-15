import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Commence from '../regulate/Commence';
import Amend from '../regulate/Amend';
import Delete from '../regulate/Delete';

const Petition = () => {
  return (
    <div className='petitionContainer'>
      <div id='page-1' className='petitionSelector'>
        <div className='split left'>
          <h1>Commence Regulation</h1>
          <a href='#page-commence' className='btn btn-success btn-left'>
            Commence
          </a>
        </div>
        <div className='split middle'>
          <h1>Amend Regulation</h1>
          <a href='#page-amend' className='btn btn-primary btn-middle'>
            Amendment
          </a>
        </div>
        <div className='split right'>
          <h1>Deregulate</h1>
          <a href='#page-delete' className='btn btn-danger btn-right'>
            Deregulate
          </a>
        </div>
      </div>
      {/* Page Commence */}
      <div id='page-commence'>
        <Commence />
      </div>
      {/* Page Amend */}
      <div id='page-amend'>
        <Amend />
      </div>
      {/* Page Delete */}
      <div id='page-delete'>
        <Delete />
      </div>
    </div>
  );
};

export default Petition;
