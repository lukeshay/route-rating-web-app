import React from "react";
import { IStandardProps } from "../standardProps";
import * as Events from "../../../types/events";
import { TableCell } from "@material-ui/core";

export interface ITableCellProps extends IStandardProps {
  onRightClick?(event: Events.ElementEvent): Events.HandlerReturn;
}

const Cell: React.FC<ITableCellProps> = ({
  children,
  className,
  id,
  onRightClick
}): JSX.Element => {
  return (
    <TableCell id={id} className={className} onContextMenu={onRightClick}>
      {children}
    </TableCell>
  );
};

export default Cell;
