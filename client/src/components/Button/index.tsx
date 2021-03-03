import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import './Button.scss';

interface ButtonProps {
  id?: string;
  primary?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  id,
  primary = false,
  onClick,
  children
}: ButtonProps) => {
  return (
    <button
      type="button"
      id={id}
      className={classNames('btn', { 'btn-primary ': primary })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
