import { Route } from './route';

export interface Wall {
  gymId: string;
  id: string;
  name: string;
  routes: Route[];
  types: string[];
}
