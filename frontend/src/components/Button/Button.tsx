// src/components/Button/Button.tsx
import React from 'react';
import '../../styles/Button.scss';
import { IButtonProps } from '../../interfaces/IButtonProps';

const Button: React.FC<IButtonProps> = ({ name, icon, onClick,  bg, bPad, color, bRad }) => {
  return (
    <button className="button" 
    style={{
      background: bg,
      padding: bPad,
      borderRadius: bRad,
      color: color,
  }} 
    onClick={onClick} >
      {icon}
      {name}
    </button>
  );
};

export default Button;
