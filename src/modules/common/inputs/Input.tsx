import TextField from '@material-ui/core/TextField';
import React from 'react';
import { StandardProps } from '../standardProps';
import { Events } from '../../../types';

export interface PropsInput extends StandardProps {
  autoCapitalize?: 'true' | undefined;
  autoComplete?: string;
  error?: boolean;
  fullWidth?: boolean;
  helpText?: string;
  placeholder?: string;
  rows?: number;
  type: string;
  value?: string;
  onChange?(event: Events.InputEvent): void;
  onKeyPress?(event: Events.KeyboardEvent): void;
}

const Input: React.FC<PropsInput> = ({
  autoCapitalize,
  autoComplete,
  className,
  color,
  error,
  fullWidth,
  helpText,
  id,
  name,
  onChange,
  onKeyPress,
  placeholder,
  rows,
  testId,
  type,
  value,
  ...rest
}): JSX.Element => (
  <TextField
    autoCapitalize={autoCapitalize}
    autoComplete={autoComplete}
    className={className}
    color={color !== 'default' ? color : undefined}
    data-test-id={testId}
    error={helpText !== '' && error}
    fullWidth={fullWidth}
    helperText={helpText}
    id={id}
    label={placeholder}
    margin="normal"
    multiline={rows !== undefined && rows > 1}
    name={name}
    onChange={onChange}
    onKeyPress={onKeyPress}
    rows={rows}
    type={type}
    value={(value || '').toString()}
    variant="outlined"
    data-testid={`${id}-input-test-id`}
    {...rest}
  />
);

Input.defaultProps = {
  error: true,
  fullWidth: true,
  helpText: '',
  id: '',
  name: '',
  placeholder: '',
};

export default Input;
