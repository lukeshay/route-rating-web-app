import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
import OptionsIcon from "@material-ui/icons/MoreHoriz";
import RRMenu from "../../../common/menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import * as Events from "../../../../types/events";

export interface IListMenuProps {
  iconClass?: string;
  optionsAnchor: HTMLElement | null;
  onDeleteClick(event: Events.ElementEvent): Events.HandlerReturn;
  onEditClick(event: Events.ElementEvent): Events.HandlerReturn;
  onOptionsClick(event: Events.ButtonEvent): Events.HandlerReturn;
  onOptionsClose(event: Events.ElementEvent): Events.HandlerReturn;
}

const ListMenu: React.FC<IListMenuProps> = ({
  iconClass,
  onDeleteClick,
  onEditClick,
  onOptionsClick,
  onOptionsClose,
  optionsAnchor
}): JSX.Element => (
  <TableCell>
    <Button
      onClick={onOptionsClick}
      variant="text"
      fullWidth={false}
      size="medium"
      type="button"
    >
      <OptionsIcon />
    </Button>
    <RRMenu
      id="optionsMenu"
      anchor={optionsAnchor}
      onClose={onOptionsClose}
      open={Boolean(optionsAnchor)}
    >
      <MenuItem onClick={onEditClick}>
        <EditIcon className={iconClass} />
        Edit
      </MenuItem>
      <MenuItem onClick={onDeleteClick}>
        <DeleteIcon className={iconClass} />
        Delete
      </MenuItem>
    </RRMenu>
  </TableCell>
);

export default ListMenu;
