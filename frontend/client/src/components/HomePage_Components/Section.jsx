import React from 'react';
import Card from './Card';
import "../../styles/Section.scss";
import student from "../../images/home_students.avif";

const Section = () => {
  return (
    <div className="section">
      <Card title="Modern Student Housing" image={student}/>
      <Card title="Co-living for Professionals" image={student} />
      <Card title="Managed Apartments" image={student} />
    </div>
  );
};

export default Section;
