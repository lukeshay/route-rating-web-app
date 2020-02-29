import React from 'react';
import { toast } from 'react-toastify';
import * as GymsActions from '../../../../context/gyms/gymsActions';
import { useGymsContext } from '../../../../context/gyms/gymsStore';
import { Gym, Route, Wall } from '../../../../types';
import TransitionModal from '../../../common/modal/Modal';
import RouteForm from './RouteForm';

export interface IRouteAddPageProps {
  gym: Gym;
  open: boolean;
  wall: Wall;
  handleClose(): Promise<void> | void;
}

const RouteAddPage: React.FC<IRouteAddPageProps> = ({
  gym,
  open,
  wall,
  handleClose,
}): JSX.Element => {
  const [route, setRoute] = React.useState<Route>({} as Route);
  const [typesMessage, setTypesMessage] = React.useState<string>('');
  const [nameMessage, setNameMessage] = React.useState<string>('');

  const { dispatch: gymsDispatch } = useGymsContext();

  const handleSubmit = async (returnRoute: Route): Promise<void> => {
    const newRoute = { wallId: wall.id, gymId: gym.id, ...returnRoute };

    setRoute(newRoute);

    if (newRoute.types.length < 1) {
      setTypesMessage('Must select a type.');
    } else {
      setTypesMessage('');
    }

    if (newRoute.name.trim().length < 1) {
      setNameMessage('Name cannot be blank');
    } else {
      setNameMessage('');
    }

    if (newRoute.types.length > 0 && newRoute.name.trim().length > 0) {
      GymsActions.createRoute(gymsDispatch, newRoute, gym).then(
        (response: Response) => {
          if (response instanceof Response && response.ok) {
            setRoute({} as Route);
            handleClose();
          } else {
            toast.error('Error adding route.');
          }
        }
      );
    }
  };

  if (gym.id !== '' && wall.id !== '') {
    return (
      <TransitionModal
        id="routeAdd"
        open={open}
        handleClose={handleClose}
        style={{ width: '475px' }}
      >
        <RouteForm
          route={route}
          formHeadText="Add route"
          handleCancel={handleClose}
          handleSubmit={handleSubmit}
          submitButtonText="Add route"
          nameMessage={nameMessage}
          typesMessage={typesMessage}
          typeOptions={wall.types}
        />
      </TransitionModal>
    );
  } else {
    return <React.Fragment />;
  }
};

export default RouteAddPage;
