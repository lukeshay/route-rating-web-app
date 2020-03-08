import * as GymsApi from '../../api/gymsApi';
import * as RouteRatingsApi from '../../api/routeRatingsApi';
import * as RoutesApi from '../../api/routesApi';
import * as WallsApi from '../../api/wallsApi';
import { Dispatch } from 'react';
import {
  Gym,
  GymPageType,
  Route,
  RouteRating,
  Wall,
  WallPage,
} from '../../types';
import { GymsContextAction } from './gymsStore';
import Types from './gymsActionTypes';

export const loadGymsQuery = (
  dispatch: Dispatch<GymsContextAction>,
  query: string,
  page: number
): Promise<void | Response> => {
  return GymsApi.getGyms(query, page).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: GymPageType) => {
        dispatch({
          actionType: Types.LOAD_GYMS,
          page: body,
        } as GymsContextAction);
      });

      return response;
    }
  });
};

export const loadGymV2 = (
  dispatch: Dispatch<GymsContextAction>,
  gymId: string
): Promise<void | Response> => {
  return GymsApi.getGymV2(gymId).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: body,
        } as GymsContextAction);
      });
    }

    return response;
  });
};

export const loadWalls = (
  dispatch: Dispatch<GymsContextAction>,
  gym: Gym
): Promise<void | Response> => {
  return WallsApi.getWalls(gym.id).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: WallPage) => {
        gym.walls = body.content;

        dispatch({
          actionType: Types.UPDATE_GYM,
          gym,
        } as GymsContextAction);
      });
    }

    return response;
  });
};

export const loadRoutes = (
  dispatch: Dispatch<GymsContextAction>,
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
            gym,
          } as GymsContextAction);
        }
      });
    }

    return response;
  });
};

export const updateGym = async (
  dispatch: Dispatch<GymsContextAction>,
  updatedGym: Gym
): Promise<void | Response> => {
  return GymsApi.updateGym(updatedGym).then((response: Response) => {
    // if (response instanceof Response && response.ok) {
    //   response.json().then((body: Gym) => {
    //     dispatch({
    //       actionType: Types.UPDATE_GYM,
    //       gym: { ...body, walls: oldGym.walls }
    //     } as IGymsContextAction);
    //   });
    // }

    return response;
  });
};

export const updateGymPhoto = async (
  dispatch: Dispatch<GymsContextAction>,
  file: File,
  gym: Gym
): Promise<void | Response> => {
  return GymsApi.updateGymPhoto(file, gym.id).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: { ...body, walls: gym.walls },
        } as GymsContextAction);
      });
    }

    return response;
  });
};

export const updateGymLogo = async (
  dispatch: Dispatch<GymsContextAction>,
  file: File,
  gym: Gym
): Promise<void | Response> => {
  return GymsApi.updateGymLogo(file, gym.id).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: { ...body, walls: gym.walls },
        } as GymsContextAction);
      });
    }

    return response;
  });
};

export const createWall = async (
  dispatch: Dispatch<GymsContextAction>,
  wall: Wall,
  gym: Gym
): Promise<void | Response> => {
  return WallsApi.createWall(wall).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadWalls(dispatch, gym);
    } else {
      return response;
    }
  });
};

export const updateWall = async (
  dispatch: Dispatch<GymsContextAction>,
  wall: Wall,
  gym: Gym
): Promise<void | Response> => {
  return WallsApi.updateWall(wall).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadWalls(dispatch, gym);
    } else {
      return response;
    }
  });
};

export const deleteWall = async (
  dispatch: Dispatch<GymsContextAction>,
  wallId: string,
  gym: Gym
): Promise<void | Response> => {
  return WallsApi.deleteWall(wallId).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadWalls(dispatch, gym);
    } else {
      return response;
    }
  });
};

export const createRoute = async (
  dispatch: Dispatch<GymsContextAction>,
  route: Route,
  gym: Gym
): Promise<void | Response> => {
  return RoutesApi.createRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadRoutes(dispatch, gym, route.wallId);
    } else {
      return response;
    }
  });
};

export const updateRoute = async (
  dispatch: Dispatch<GymsContextAction>,
  route: Route,
  gym: Gym
): Promise<void | Response> => {
  return RoutesApi.updateRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadRoutes(dispatch, gym, route.wallId);
    } else {
      return response;
    }
  });
};

export const deleteRoute = async (
  dispatch: Dispatch<GymsContextAction>,
  route: Route,
  gym: Gym
): Promise<void | Response> => {
  return RoutesApi.deleteRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadRoutes(dispatch, gym, route.wallId);
    } else {
      return response;
    }
  });
};

export const createRouteRating = async (
  dispatch: Dispatch<GymsContextAction>,
  rating: RouteRating,
  gym: Gym,
  wallId: string
): Promise<void | Response> => {
  return RouteRatingsApi.createRouteRating(rating).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        return loadRoutes(dispatch, gym, wallId);
      } else {
        return response;
      }
    }
  );
};
