import React from 'react';
import { StandardProps } from '../standardProps';
import * as Events from '../../../types/events';
import { TableCell } from '@material-ui/core';

export interface TableCellProps extends StandardProps {
  onRightClick?(event: Events.ElementEvent): Events.HandlerReturn;
}

const Cell: React.FC<TableCellProps> = ({
  children,
  className,
  id,
  onRightClick,
}): JSX.Element => {
  return (
    <TableCell
      id={id}
      className={className}
      onContextMenu={onRightClick}
      data-testid={`${id}-cell-test-id`}
    >
      {children}
    </TableCell>
  );
};

export default Cell;
