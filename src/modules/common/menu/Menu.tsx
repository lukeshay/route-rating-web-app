import React from 'react';
import { StandardProps } from '../standardProps';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import { Events } from '../../../types';

export interface MenuProps extends StandardProps {
  anchor: HTMLElement | null;
  children?: React.ReactNode;
  open: boolean;
  onClose(event: Events.ElementEvent): void;
}

const RRMenu: React.FC<MenuProps> = ({
  anchor,
  children,
  id,
  onClose,
  open,
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
        data-testid={`${id}-menu-test-id`}
      >
        {children}
      </Menu>
    </div>
  );
};

export default RRMenu;
