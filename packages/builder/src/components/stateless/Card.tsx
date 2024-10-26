import React from 'react';

export interface CardProps {
  title: string;
  children: React.ReactNode;
  onSelect: () => void;
  isSelected: boolean; // Add isSelected prop
}

export const Card: React.FC<CardProps> = ({ title, children, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect();
  };

  return (
    <article>
      <div className={`card ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
        <h2>{title}</h2>
        {isSelected && children}
      </div>
    </article>
  );
};




