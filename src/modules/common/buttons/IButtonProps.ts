import React from 'react';
import { IStandardProps } from '../standardProps';

export { ButtonProps } from '@material-ui/core/Button';

export interface IButtonProps extends IStandardProps {
  component?: React.ElementType;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?(event: any): void | Promise<void>;
  size?: 'small' | 'medium' | 'large' | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
}
