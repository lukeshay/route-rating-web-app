import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
import OptionsIcon from "@material-ui/icons/MoreHoriz";
import RRMenu from "../../../common/menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ButtonEvent, ElementEvent } from "../../../../types";
import { HandlerReturn } from "../../../../types";

export interface IListMenuProps {
  onOptionsClick(event: ButtonEvent): HandlerReturn;
  optionsAnchor: HTMLElement | null;
  onOptionsClose(event: ElementEvent): HandlerReturn;
  iconClass?: string;
  onEditClick(event: ElementEvent): HandlerReturn;
  onDeleteClick(event: ElementEvent): HandlerReturn;
}

const ListMenu: React.FC<IListMenuProps> = ({
  onOptionsClick,
  optionsAnchor,
  onOptionsClose,
  iconClass,
  onEditClick,
  onDeleteClick
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
