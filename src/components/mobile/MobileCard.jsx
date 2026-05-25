import React from 'react';

const MobileCard = ({ children, onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`soft-card rounded-2xl p-4 mb-3 active:scale-98 transition ${
        onClick ? 'cursor-pointer hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default MobileCard;
