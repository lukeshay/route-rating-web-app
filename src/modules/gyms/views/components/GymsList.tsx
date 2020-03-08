import { Gym } from '../../../../types';
import React from 'react';
import GymCard from './GymCard';

interface GymsListProps {
  cardClass: string;
  gyms: Gym[];
  mobile: boolean;
  onClick(id: string): void;
}

const GymsList: React.FC<GymsListProps> = ({
  cardClass,
  gyms,
  mobile,
  onClick,
}): JSX.Element => (
  <React.Fragment>
    {gyms.map((gym) => (
      <GymCard
        key={gym.id}
        mobile={mobile}
        gym={gym}
        desktopCardClass={cardClass}
        onClick={(): void => onClick(gym.id)}
      />
    ))}
  </React.Fragment>
);

export default GymsList;
