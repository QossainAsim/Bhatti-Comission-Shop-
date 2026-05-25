import React from 'react';

const MobileCard = ({ children, onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md p-4 mb-3 active:scale-98 transition ${
        onClick ? 'cursor-pointer hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default MobileCard;