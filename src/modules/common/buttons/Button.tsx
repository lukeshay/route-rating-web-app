import MUIButton from '@material-ui/core/Button';
import React from 'react';
import { Events } from '../../../types';

export interface ButtonProps {
  children?: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary';
  component?: React.ElementType;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  size?: 'small' | 'medium' | 'large' | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  onClick?(event: Events.ButtonEvent): void | Promise<void>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  component,
  disabled,
  id,
  fullWidth,
  size,
  type,
  variant,
  onClick,
  ...rest
}): JSX.Element => {
  if (component) {
    return (
      <MUIButton
        id={id}
        color={color}
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        onClick={onClick}
        component={component}
        data-testid={`${id}-button-test-id`}
        {...rest}
      >
        {children}
      </MUIButton>
    );
  } else {
    return (
      <MUIButton
        id={id}
        color={color}
        type={type}
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        onClick={onClick}
        {...rest}
      >
        {children}
      </MUIButton>
    );
  }
};

Button.defaultProps = {
  color: 'default',
  disabled: false,
  fullWidth: true,
  size: 'medium',
  type: 'button',
  variant: 'contained',
};

export default Button;
