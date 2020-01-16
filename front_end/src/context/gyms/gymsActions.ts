import * as GymsApi from "../../api/gymsApi";
import * as RouteRatingsApi from "../../api/routeRatingsApi";
import * as RoutesApi from "../../api/routesApi";
import * as WallsApi from "../../api/wallsApi";
import { Gym, Route, RouteRating, Wall } from "../../types";
import Types from "./gymsActionTypes";
import { IGymsContextAction } from "./gymsStore";

export const loadGyms = (dispatch: any): Promise<void | Response> => {
  return GymsApi.getGyms().then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym[]) => {
        dispatch({
          actionType: Types.LOAD_GYMS,
          gyms: body
        } as IGymsContextAction);
      });

      return response;
    }
  });
};

export const loadGymV2 = (
  dispatch: any,
  gymId: string
): Promise<void | Response> => {
  return GymsApi.getGymV2(gymId).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: body
        } as IGymsContextAction);
      });
    }

    return response;
  });
};

export const loadWalls = (
  dispatch: any,
  gym: Gym
): Promise<void | Response> => {
  return WallsApi.getWalls(gym.id).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Wall[]) => {
        gym.walls = body;

        dispatch({
          actionType: Types.UPDATE_GYM,
          gym
        } as IGymsContextAction);
      });
    }

    return response;
  });
};

export const loadRoutes = (
  dispatch: any,
  gym: Gym,
  wallId: string
): Promise<void | Response> => {
  return RoutesApi.getRoutesOfWall(wallId).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Route[]) => {
        if (gym.walls) {
          gym.walls = gym.walls.map((wall: Wall) => {
            if (wallId === wall.id) {
              wall.routes = body;
            }

            return wall;
          });

          dispatch({
            actionType: Types.UPDATE_GYM,
            gym
          } as IGymsContextAction);
        }
      });
    }

    return response;
  });
};

export const updateGym = async (
  dispatch: any,
  updatedGym: Gym,
  oldGym: Gym
): Promise<void | Response> => {
  return GymsApi.updateGym(updatedGym).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: { ...body, walls: oldGym.walls }
        } as IGymsContextAction);
      });
    }

    return response;
  });
};

export const createWall = async (
  dispatch: any,
  wall: Wall,
  gymId: string
): Promise<void | Response> => {
  return WallsApi.createWall(wall).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const updateWall = async (
  dispatch: any,
  wall: Wall,
  gymId: string
): Promise<void | Response> => {
  return WallsApi.updateWall(wall).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const deleteWall = async (
  dispatch: any,
  wallId: string,
  gymId: string
): Promise<void | Response> => {
  return WallsApi.deleteWall(wallId).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const createRoute = async (
  dispatch: any,
  route: Route,
  gymId: string
): Promise<void | Response> => {
  return RoutesApi.createRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const updateRoute = async (
  dispatch: any,
  route: Route,
  gymId: string
): Promise<void | Response> => {
  return RoutesApi.updateRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const deleteRoute = async (
  dispatch: any,
  route: Route,
  gymId: string
): Promise<void | Response> => {
  return RoutesApi.deleteRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const createRouteRating = async (
  dispatch: any,
  rating: RouteRating,
  gymId: string
): Promise<void | Response> => {
  return RouteRatingsApi.createRouteRating(rating).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        return loadGymV2(dispatch, gymId);
      } else {
        return response;
      }
    }
  );
};