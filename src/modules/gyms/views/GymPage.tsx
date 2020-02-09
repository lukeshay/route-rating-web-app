import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import RateReviewIcon from "@material-ui/icons/RateReview";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import { Gym, Route, Wall } from "../../../types";
import * as StyleUtils from "../../../utils/styleUtils";
import * as GymUtils from "../../../utils/gymUtils";
import GymInformation from "./components/GymInformation";
import RatingAddModal from "./components/RatingAddModal";
import RatingPage from "./RatingPage";
import RouteAddModal from "./components/RouteAddModal";
import RouteEditModal from "./components/RouteEditModal";
import RoutesList from "./components/RoutesList";
import WallAddModal from "./components/WallAddModal";
import WallEditModal from "./components/WallEditModal";
import WallList from "./components/WallList";
import * as ResponseUtils from "../../../utils/responseUtils";
import { useViewContext } from "../../../context/view/viewStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      position: "absolute",
      right: "10px"
    },
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    icons: {
      paddingRight: theme.spacing(1)
    },
    list: {
      marginTop: theme.spacing(2),
      paddingBottom: "20px"
    }
  })
);

const GymPage: React.FC = (): JSX.Element => {
  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: userState } = useUserContext();
  const { state: viewState } = useViewContext();

  const [gym, setGym] = React.useState<Gym>({} as Gym);
  const [view, setView] = React.useState<"WALL" | "ROUTE" | "RATING">("WALL");
  const [wall, setWall] = React.useState<Wall | undefined>(undefined);
  const [routes, setRoutes] = React.useState<Route[]>([]);
  const [route, setRoute] = React.useState<Route | undefined>(undefined);
  const [canEdit, setCanEdit] = React.useState<boolean>(false);
  const [wallId, setWallId] = React.useState<string>("");
  const [openAdd, setOpenAdd] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();
  const [gymId] = React.useState<string | undefined>(
    history.location.pathname
      .split("/")
      .splice(-1)
      .pop()
  );

  React.useEffect(() => {
    if (!gymId || !gymsState.page || !gymsState.page.content) {
      history.push(Routes.GYMS);
    } else {
      const tempGym = GymUtils.getGymById(gymsState.page.content, gymId);

      if (!tempGym) {
        history.push(Routes.GYMS);
      } else if (!tempGym.walls) {
        if (tempGym.id) {
          GymsActions.loadWalls(gymsDispatch, tempGym).then(
            (response: Response) => {
              ResponseUtils.toastIfNotOk(response, "Error getting walls.");
            }
          );
        }
      }

      if (tempGym) {
        setGym(tempGym);

        const { user } = userState;
        const { authorizedEditors } = tempGym;

        const tempWall = GymUtils.getWallById(tempGym, wallId);

        if (tempWall) {
          setRoutes(tempWall.routes);
          setWallId(tempWall.id);

          if (route) {
            const tempRoute = tempWall.routes
              ? tempWall.routes.find(
                  (element: Route) => route.id === element.id
                )
              : null;

            if (tempRoute) {
              setRoute(tempRoute);
            }
          }
        }

        if (
          user &&
          authorizedEditors &&
          authorizedEditors.find((editorId: string) => editorId === user.id)
        ) {
          setCanEdit(true);
        } else {
          setCanEdit(false);
        }
      }
    }
  }, [gymId, gymsState, userState]);

  const handleWallRowClick = async (rowWallId: string): Promise<void> => {
    const tempWall = GymUtils.getWallById(gym, rowWallId);

    if (tempWall) {
      if (!tempWall.routes || tempWall.routes.length === 0) {
        const response = await GymsActions.loadRoutes(
          gymsDispatch,
          gym,
          tempWall.id
        );

        if (!ResponseUtils.isOk(response)) {
          toast.error("Error getting routes.");
        }
      }

      setView("ROUTE");
      setRoutes(tempWall.routes);
      setWallId(tempWall.id);
    } else {
      toast.error("Could not find wall.");
    }
  };

  const handleDeleteWall = async (rowWallId: string): Promise<void> => {
    if (
      window.confirm(
        "Are you sure you want to delete this wall? This action cannot be undone."
      )
    ) {
      if (gymId) {
        GymsActions.deleteWall(gymsDispatch, rowWallId, gym).then(
          (response: Response) => {
            if (!response || !(response instanceof Response) || !response.ok) {
              toast.error("Error deleting wall.");
            }
          }
        );
      } else {
        toast.error("Error deleting wall.");
      }
    }
  };

  const handleRouteRowClick = async (routeFromRow: Route): Promise<void> => {
    setRoute(routeFromRow);
    setView("RATING");
  };

  const handleDeleteRoute = async (routeId: string): Promise<void> => {
    if (
      window.confirm(
        "Are you sure you want to delete this route? This action cannot be undone."
      )
    ) {
      if (gymId) {
        GymsActions.deleteRoute(
          gymsDispatch,
          { id: routeId, gymId, wallId } as Route,
          gym
        ).then((response: Response) => {
          ResponseUtils.toastIfNotOk(response, "Error deleting route.");
        });
      } else {
        toast.error("Error deleting route.");
      }
    }
  };

  const handleEditRoute = async (tempRoute: Route): Promise<void> => {
    if (canEdit) {
      setRoute(tempRoute);
      setOpenEdit(true);
      setOpenAdd(false);
    }
  };

  const handleEditWall = async (tempWall: Wall): Promise<void> => {
    if (canEdit) {
      setWall(tempWall);
      setOpenEdit(true);
      setOpenAdd(false);
    }
  };

  const handleOpenAdd = async (): Promise<void> => {
    if ((view !== "RATING" && canEdit) || view === "RATING") {
      setOpenAdd(true);
      setOpenEdit(false);
    }
  };

  const handleCloseAdd = async (): Promise<void> => setOpenAdd(false);

  const handleCloseEdit = async (): Promise<void> => {
    setOpenEdit(false);
    setRoute(undefined);
    setWall(undefined);
  };

  const Buttons: React.FC = (): JSX.Element => (
    <div className={classes.buttonWrapper}>
      <Button
        variant="text"
        fullWidth={false}
        size="medium"
        type="button"
        onClick={(): void => {
          if (view === "ROUTE") {
            setView("WALL");
            setWallId("");
          } else {
            setView("ROUTE");
            setRoute(undefined);
          }
        }}
        style={StyleUtils.shouldBeVisible(view !== "WALL")}
      >
        <ArrowBackIcon className={classes.icons} />
        Back
      </Button>
      <Button
        onClick={handleOpenAdd}
        className={classes.addButton}
        variant="text"
        fullWidth={false}
        size="medium"
        type="button"
        style={StyleUtils.shouldBeVisible(
          canEdit || (view === "RATING" && userState.user !== null)
        )}
      >
        {view === "RATING" ? (
          <RateReviewIcon className={classes.icons} />
        ) : (
          <AddIcon className={classes.icons} />
        )}
        {view === "RATING" ? "Review" : "Add"}
      </Button>
    </div>
  );

  const CurrentView: React.FC = (): JSX.Element => {
    if (view === "WALL") {
      return (
        <WallList
          walls={gym.walls}
          onRowClick={handleWallRowClick}
          canEdit={canEdit}
          handleDeleteWall={handleDeleteWall}
          handleEditClick={handleEditWall}
        />
      );
    }

    if (view === "ROUTE") {
      return (
        <RoutesList
          canEdit={canEdit}
          routes={routes}
          handleDeleteRoute={handleDeleteRoute}
          handleEditRoute={handleEditRoute}
          handleRowClick={handleRouteRowClick}
        />
      );
    }

    if (view === "RATING") {
      return <RatingPage route={route || ({} as Route)} />;
    }

    return <React.Fragment />;
  };

  const Modals: React.FC = (): JSX.Element => {
    if (gymId) {
      return (
        <React.Fragment>
          <RouteAddModal
            open={view === "ROUTE" && openAdd}
            handleClose={handleCloseAdd}
            gym={gym}
            wallId={wallId}
          />
          {route && (
            <RouteEditModal
              open={view === "ROUTE" && openEdit}
              handleClose={handleCloseEdit}
              gym={gym}
              wallId={wallId}
              route={route}
            />
          )}
          <WallAddModal
            open={view === "WALL" && openAdd}
            handleClose={handleCloseAdd}
            gym={gym}
          />
          {wall && (
            <WallEditModal
              open={view === "WALL" && openEdit}
              handleClose={handleCloseEdit}
              gymId={gymId}
              wall={wall}
            />
          )}
          {route && (
            <RatingAddModal
              open={view === "RATING" && openAdd}
              handleClose={handleCloseAdd}
              routeId={route.id}
              gym={gym}
              wallId={wallId}
            />
          )}
        </React.Fragment>
      );
    } else {
      return <React.Fragment />;
    }
  };

  return (
    <React.Fragment>
      <GymInformation gym={gym} canEdit={canEdit} mobile={viewState.mobile} />
      <div
        className={classes.list}
        style={StyleUtils.shouldDisplay(
          (gym.walls && gym.walls.length !== 0) || canEdit
        )}
      >
        <Buttons />
        <CurrentView />
        <Modals />
      </div>
    </React.Fragment>
  );
};

export default React.memo(GymPage);
