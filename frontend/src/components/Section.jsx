// src/components/Section.jsx (or similar path in your src folder)
import React from 'react';

const Section = ({ id, className, children }) => {
  return (
    <section 
      id={id} 
      className={className}
    >
      {children}
    </section>
  );
};

export default Section;