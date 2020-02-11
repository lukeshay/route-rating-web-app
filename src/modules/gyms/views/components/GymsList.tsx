import { Gym } from "../../../../types";
import React from "react";
import GymCard from "./GymCard";

interface IGymsListProps {
  cardClass: string;
  gyms: Gym[];
  mobile: boolean;
  onClick(id: any): void;
}

const GymsList: React.FC<IGymsListProps> = ({
  cardClass,
  gyms,
  mobile,
  onClick
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