import {
  Button,
  TableCell,
  TableRow,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import {
  ButtonEvent,
  ElementEvent,
  HandlerReturn,
  Route
} from "../../../../types";
import * as GradeUtils from "../../../../utils/gradeUtils";
import Table from "../../../common/table/Table";
import * as GymUtils from "../../../../utils/gymUtils";
import ListMenu from "./ListMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      paddingRight: theme.spacing(1)
    },
    editCellStyle: {
      width: "15%"
    }
  })
);

export interface IRouteRowProps {
  canEdit: boolean;
  mobile: boolean;
  route: Route;
  onDeleteClick(routeId: string): Promise<void> | void;
  onEditClick(route: Route): Promise<void> | void;
  onRowClick(route: Route): Promise<void> | void;
}

const RouteRow: React.FC<IRouteRowProps> = ({
  canEdit,
  mobile,
  onDeleteClick,
  onEditClick,
  onRowClick,
  route
}): JSX.Element => {
  const classes = useStyles();

  const [optionsAnchor, setOptionsAnchor] = React.useState<null | HTMLElement>(
    null
  );

  const { averageGrade, holdColor, id, name, averageRating, setter } = route;
  const types = GymUtils.parseTypesToString(route.types);

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
    onEditClick(route);
  };

  const handleDeleteClick = (event: ElementEvent): void => {
    event.stopPropagation();
    handleOptionsClose(event);
    onDeleteClick(id);
  };

  const cellClass = canEdit ? classes.editCellStyle : undefined;

  return (
    <TableRow
      hover
      id={id}
      onClick={(): HandlerReturn => onRowClick(route)}
      data-test-id="route-row-test-id"
    >
      <TableCell className={cellClass}>{name}</TableCell>
      <TableCell className={cellClass}>{types}</TableCell>
      {(!mobile || canEdit) && (
        <TableCell className={cellClass}>{setter}</TableCell>
      )}
      <TableCell className={cellClass}>{holdColor}</TableCell>
      <TableCell className={cellClass}>
        {averageGrade && GradeUtils.convertGradeToString(averageGrade)}
      </TableCell>
      {(!mobile || canEdit) && (
        <TableCell className={cellClass}>
          {averageRating > 0 && Math.round(averageRating * 10) / 10}
        </TableCell>
      )}
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

export interface IRoutesListProps {
  canEdit: boolean;
  mobile: boolean;
  routes: Route[];
  handleDeleteRoute(routeId: string): Promise<void> | void;
  handleEditRoute(route: Route): Promise<void> | void;
  handleRowClick(route: Route): Promise<void> | void;
}

const RoutesList: React.FC<IRoutesListProps> = ({
  canEdit,
  handleDeleteRoute,
  handleEditRoute,
  handleRowClick,
  mobile,
  routes
}): JSX.Element => {
  const classes = useStyles();

  const cellClass = canEdit ? classes.editCellStyle : undefined;

  return (
    <Table
      head={
        <TableRow>
          <TableCell key="route" className={cellClass}>
            Route
          </TableCell>
          <TableCell key="types" className={cellClass}>
            Types
          </TableCell>
          {(!mobile || canEdit) && (
            <TableCell key="setter" className={cellClass}>
              Setter
            </TableCell>
          )}
          <TableCell key="color" className={cellClass}>
            Color
          </TableCell>
          <TableCell key="grade" className={cellClass}>
            Grade
          </TableCell>
          {(!mobile || canEdit) && (
            <TableCell key="rating" className={cellClass}>
              Rating
            </TableCell>
          )}
          {canEdit && <TableCell key="edit">Options</TableCell>}
        </TableRow>
      }
      body={
        routes &&
        routes.map((route: Route) => (
          <RouteRow
            mobile={mobile}
            canEdit={canEdit}
            key={route.id}
            route={route}
            onDeleteClick={handleDeleteRoute}
            onEditClick={handleEditRoute}
            onRowClick={handleRowClick}
          />
        ))
      }
      testId="route-list-test-id"
    />
  );
};

export default RoutesList;
