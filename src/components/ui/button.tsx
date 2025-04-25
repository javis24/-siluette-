'use client';

import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded text-white font-semibold transition duration-200',
        {
          'bg-blue-600 hover:bg-blue-700': variant === 'primary',
          'bg-gray-500 hover:bg-gray-600': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
