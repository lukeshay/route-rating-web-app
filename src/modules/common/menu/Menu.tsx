import React from "react";
import { IStandardProps } from "../standardProps";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import { ElementEvent } from "../../../types";

export interface IMenuProps extends IStandardProps {
  anchor: HTMLElement | null;
  children?: React.ReactNode;
  onClose(event: ElementEvent): void;
  open: boolean;
}

const RRMenu: React.FC<IMenuProps> = ({
  anchor,
  children,
  id,
  onClose,
  open
}): JSX.Element => {
  return (
    <div>
      <Menu
        id={id}
        anchorEl={anchor}
        keepMounted
        open={open}
        onClose={onClose}
        TransitionComponent={Fade}
      >
        {children}
      </Menu>
    </div>
  );
};

export default RRMenu;
