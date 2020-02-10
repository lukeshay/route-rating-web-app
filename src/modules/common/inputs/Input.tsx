import TextField from "@material-ui/core/TextField";
import React from "react";
import { IStandardProps } from "../standardProps";

export interface IPropsInput extends IStandardProps{
  autoCapitalize?: "true" | undefined;
  autoComplete?: string;
  error?: boolean;
  fullWidth?: boolean;
  helpText?: string;
  onChange?(event: any): void;
  onKeyPress?(even: any): void;
  placeholder?: string;
  rows?: number;
  type: string;
  value?: string;
}

const Input: React.FC<IPropsInput> = ({
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
}): JSX.Element => (
  <TextField
    autoCapitalize={autoCapitalize}
    autoComplete={autoComplete}
    className={className}
    color={color !== "default" ? color : undefined}
    data-test-id={testId}
    error={helpText !== "" && error}
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
    value={(value || "").toString()}
    variant="outlined"
  />
);

Input.defaultProps = {
  error: true,
  fullWidth: true,
  helpText: "",
  id: "",
  name: "",
  placeholder: ""
};

export default Input;
