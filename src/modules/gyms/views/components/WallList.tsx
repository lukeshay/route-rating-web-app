import { Theme, createStyles, makeStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { ButtonEvent, ElementEvent, Wall } from "../../../../types";
import Table from "../../../common/table/Table";
import * as GymUtils from "../../../../utils/gymUtils";
import ListMenu from "./ListMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      paddingRight: theme.spacing(1)
    },
    editCellStyle: {
      width: "30%"
    }
  })
);

export interface IWallRowProps {
  wall: Wall;
  canEdit: boolean;
  onRowClick(wallId: string): Promise<void> | void;
  onEditClick(wall: Wall): Promise<void> | void;
  onDeleteClick(wallId: string): Promise<void> | void;
}

const WallRow: React.FC<IWallRowProps> = ({
  wall,
  onRowClick,
  canEdit,
  onEditClick,
  onDeleteClick
}): JSX.Element => {
  const classes = useStyles();
  const { id, routes, name } = wall;
  const [optionsAnchor, setOptionsAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const types = GymUtils.parseTypesToString(wall.types);

  const handleOptionsClick = (event: ButtonEvent): void => {
    event.stopPropagation();

    setOptionsAnchor(event.currentTarget);
  };

  const handleOptionsClose = (event: ElementEvent) => {
    event.stopPropagation();
    setOptionsAnchor(null);
  };

  const handleEditClick = (event: ElementEvent): void => {
    event.stopPropagation();
    handleOptionsClose(event);
    onEditClick(wall);
  };

  const handleDeleteClick = (event: ElementEvent): void => {
    event.stopPropagation();
    handleOptionsClose(event);
    onDeleteClick(wall.id);
  };

  const cellClass = canEdit ? classes.editCellStyle : undefined;

  return (
    <TableRow
      hover
      id={id}
      onClick={(): void | Promise<void> => onRowClick(id)}
      data-test-id="wall-row-test-id"
    >
      <TableCell className={cellClass}>{name}</TableCell>
      <TableCell className={cellClass}>{routes ? routes.length : 0}</TableCell>
      <TableCell className={cellClass}>{types}</TableCell>
      {canEdit && (
        <ListMenu
          onOptionsClick={handleOptionsClick}
          optionsAnchor={optionsAnchor}
          onOptionsClose={handleOptionsClose}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          iconClass={classes.icons}
        />
      )}
    </TableRow>
  );
};

export interface IWallListProps {
  walls: Wall[] | null;
  canEdit: boolean;
  onRowClick(wallId: string): Promise<void>;
  onEditClick(wall: Wall): Promise<void> | void;
  onDeleteWall(wallId: string): Promise<void>;
}

const WallList: React.FC<IWallListProps> = ({
  walls,
  onRowClick,
  canEdit,
  onDeleteWall,
  onEditClick
}): JSX.Element => {
  const classes = useStyles();

  const cellClass = canEdit ? classes.editCellStyle : undefined;

  return (
    <Table
      head={
        <TableRow>
          <TableCell key="wall" className={cellClass}>
            Wall
          </TableCell>
          <TableCell key="routes" className={cellClass}>
            Routes
          </TableCell>
          <TableCell key="type" className={cellClass}>
            Type
          </TableCell>
          {canEdit && <TableCell key="edit">Options</TableCell>}
        </TableRow>
      }
      body={
        walls &&
        walls.map((wall: Wall) => (
          <WallRow
            key={wall.id}
            wall={wall}
            onRowClick={onRowClick}
            canEdit={canEdit}
            onDeleteClick={onDeleteWall}
            onEditClick={onEditClick}
          />
        ))
      }
      testId="wall-list-test-id"
    />
  );
};

export default WallList;
