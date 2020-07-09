import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  chikdren: PropTypes.object,
};

export default Section;
