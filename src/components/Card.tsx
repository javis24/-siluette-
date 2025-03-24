import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div>{content}</div>
    </div>
  );
};

export default Card;
