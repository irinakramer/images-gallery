import React from 'react';
import { Spinner as Loader } from 'react-bootstrap';

const Spinner = () => {
  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <Loader animation="border" variant="primary" />
    </div>
  );
};

export default Spinner;
