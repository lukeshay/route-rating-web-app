import { Gym, GymPageType, Route, User, Wall, WallTypes } from '../types';
import { IGymsContextState } from '../context/gyms/gymsStore';
import { IViewContextState } from '../context/view/viewStore';
import { IUserContextState } from '../context/user/userStore';

export const testRouteOne: Route = {
  averageGrade: 'GRADE_5_9',
  averageRating: 4,
  gymId: 'gym1',
  holdColor: 'Blue',
  id: 'route1',
  name: 'RouteOne',
  setter: 'LukeOne',
  types: [WallTypes.TOP_ROPE, WallTypes.LEAD],
  wallId: 'wall1',
};

export const testRouteTwo: Route = {
  averageGrade: 'GRADE_5_12ab',
  averageRating: 4,
  gymId: 'gym1',
  holdColor: 'Red',
  id: 'route2',
  name: 'RouteTwo',
  setter: 'LukeTwo',
  types: [WallTypes.TOP_ROPE, WallTypes.LEAD],
  wallId: 'wall1',
};

export const testWallOne: Wall = {
  gymId: 'gym1',
  id: 'wall1',
  name: 'Wall1',
  routes: [testRouteOne, testRouteTwo],
  types: [WallTypes.LEAD, WallTypes.TOP_ROPE],
};

export const testWallTwo: Wall = {
  gymId: 'gym1',
  id: 'wall2',
  name: 'Wall2',
  routes: [],
  types: [WallTypes.LEAD, WallTypes.TOP_ROPE],
};

export const testGymOne: Gym = {
  address: '1234 Five Street',
  authorizedEditors: ['id'],
  city: 'Ames',
  email: 'abc@d.com',
  id: 'gym1',
  logoUrl: '',
  name: 'Gym One',
  phoneNumber: '1234567890',
  photoUrl: '',
  state: 'Iowa',
  walls: [testWallOne, testWallTwo],
  website: 'lukeshay.com',
  zipCode: '50014',
};

export const testGymTwo: Gym = {
  address: '1234 Five Street',
  authorizedEditors: ['id'],
  city: 'Ames',
  email: 'abc@d.com',
  id: 'gym2',
  logoUrl: '',
  name: 'Gym Two',
  phoneNumber: '1234567890',
  photoUrl: '',
  state: 'Iowa',
  walls: [testWallOne, testWallTwo],
  website: 'lukeshay.com',
  zipCode: '50014',
};

export const testUserEditor: User = {
  authority: 'ADMIN',
  city: 'Ames',
  country: 'USA',
  email: 'email',
  firstName: 'Name',
  id: 'id',
  lastName: 'Last',
  password: 'password',
  phoneNumber: '1111111111',
  role: 'ADMIN_ROLE',
  session: null,
  state: 'IA',
  username: 'username',
};

export const mockGymsState: IGymsContextState = {
  page: { content: [testGymOne, testGymTwo] } as GymPageType,
};

export const darkDesktopState: IViewContextState = {
  mobile: false,
  theme: 'DARK_THEME',
};

export const signedInEditorState: IUserContextState = {
  user: testUserEditor,
};

export const signedOutState: IUserContextState = {
  user: null,
};
