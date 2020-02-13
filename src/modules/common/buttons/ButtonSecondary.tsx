import Button from "@material-ui/core/Button";
import React from "react";
import { IButtonProps } from "./IButtonProps";

const ButtonSecondary: React.FC<IButtonProps> = ({
  id,
  type,
  variant,
  disabled,
  fullWidth,
  size,
  children,
  onClick,
  testId,
  ...rest
}): JSX.Element => {
  return (
    <Button
      id={id}
      color="secondary"
      type={type}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
      data-test-id={testId}
      data-testid={`${id}-button-test-id`}
      {...rest}
    >
      {children}
    </Button>
  );
};

ButtonSecondary.defaultProps = {
  disabled: false,
  fullWidth: true,
  size: "medium",
  type: "button",
  variant: "contained"
};

export default ButtonSecondary;
