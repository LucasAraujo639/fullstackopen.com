import React from 'react';
import { Part } from './Part';

const Header = ({ name }) => (
  <div>
    <h1>{name}</h1>
  </div>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} parts={part} />)}
  </div>
);

const Total = ({ parts }) => {
  const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <p>Total of {totalAmount} exercises</p>
    </div>
  );
};

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
