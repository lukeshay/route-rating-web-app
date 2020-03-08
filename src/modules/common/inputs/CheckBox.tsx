import { Checkbox, FormControlLabel } from '@material-ui/core';
import React from 'react';
import { StandardProps } from '../standardProps';
import { InputEvent } from '../../../types';

export interface CheckBoxProps extends StandardProps {
  checked: boolean;
  label: string;
  value: string;
  onChange?(event: InputEvent): Promise<void> | void;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({
  checked,
  className,
  id,
  value,
  onChange,
  color,
  label,
}): JSX.Element => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          checked={checked}
          onChange={onChange}
          value={value}
          color={color}
          data-testid={`${id}-checkbox-test-id`}
        />
      }
      label={label}
      className={className}
    />
  );
};

CheckBox.defaultProps = {
  color: 'default',
};

export default CheckBox;
