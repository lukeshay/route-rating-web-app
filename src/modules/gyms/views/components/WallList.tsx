import { Theme, createStyles, makeStyles } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { ButtonEvent, ElementEvent, Wall } from "../../../../types";
import Table from "../../../common/table/Table";
import * as GymUtils from "../../../../utils/gymUtils";
import ListMenu from "./ListMenu";
import Cell from "../../../common/table/TableCell";

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

  const handleRightClick = (event: ElementEvent): void => {
    event.preventDefault();
    setOptionsAnchor(event.currentTarget);
  };

  const handleOptionsClick = (event: ButtonEvent): void => {
    event.stopPropagation();
    setOptionsAnchor(event.currentTarget);
  };

  const handleOptionsClose = (event: ElementEvent): void => {
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
      <Cell id="wallName" className={cellClass} onRightClick={handleRightClick}>
        {name}
      </Cell>
      <Cell
        id="wallRoutes"
        className={cellClass}
        onRightClick={handleRightClick}
      >
        {routes ? routes.length : 0}
      </Cell>
      <Cell
        id="wallTypes"
        className={cellClass}
        onRightClick={handleRightClick}
      >
        {types}
      </Cell>
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
      id="walls"
      head={
        <TableRow>
          <Cell key="wall" id="wall" className={cellClass}>
            Wall
          </Cell>
          <Cell key="routes" id="routes" className={cellClass}>
            Routes
          </Cell>
          <Cell key="type" id="type" className={cellClass}>
            Type
          </Cell>
          {canEdit && (
            <Cell key="edit" id="edit">
              Options
            </Cell>
          )}
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
