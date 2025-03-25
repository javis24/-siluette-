import React from 'react';

interface CardProps {
  title: string;
  content: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div>{content}</div>
    </div>
  );
};

export default Card;
