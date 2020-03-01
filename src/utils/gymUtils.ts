import { Gym, Route, User, Wall } from '../types';

export const isAuthorizedEditor = (gym: Gym, user: User): boolean =>
  gym.authorizedEditors !== undefined &&
  gym.authorizedEditors.find((editorId: string) => editorId === user.id) !==
    undefined;

export const getWallById = (gym: Gym, wallId: string): Wall | undefined =>
  gym.walls ? gym.walls.find((wall) => wall.id === wallId) : undefined;

export const getRouteById = (wall: Wall, routeId: string): Route | undefined =>
  wall.routes ? wall.routes.find((route) => route.id === routeId) : undefined;

export const getGymById = (gyms: Gym[], gymId: string): Gym | undefined =>
  gyms.filter((element) => element.id === gymId).pop();
