import React from "react";
import { toast } from "react-toastify";
import * as GymsActions from "../../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../../context/gyms/gymsStore";
import { Gym, Route } from "../../../../types";
import TransitionModal from "../../../common/modal/Modal";
import RouteForm from "./RouteForm";

export interface IRouteEditPageProps {
  gym: Gym;
  open: boolean;
  route: Route;
  wallId: string;
  handleClose(): Promise<void> | void;
}

const RouteEditPage: React.FC<IRouteEditPageProps> = ({
  gym,
  open,
  route,
  wallId,
  handleClose
}): JSX.Element => {
  const [updatedRoute, setUpdatedRoute] = React.useState<Route>(route);
  const [typesMessage, setTypesMessage] = React.useState<string>("");
  const [nameMessage, setNameMessage] = React.useState<string>("");

  const { dispatch: gymsDispatch } = useGymsContext();

  const handleSubmit = async (returnRoute: Route): Promise<void> => {
    const newRoute = { id: route.id, wallId, gymId: gym.id, ...returnRoute };

    setUpdatedRoute(newRoute);

    if (newRoute.types.length < 1) {
      setTypesMessage("Must select a type.");
    } else {
      setTypesMessage("");
    }

    if (newRoute.name.trim().length < 1) {
      setNameMessage("Name cannot be blank");
    } else {
      setNameMessage("");
    }

    if (newRoute.types.length > 0 && newRoute.name.trim().length > 0) {
      GymsActions.updateRoute(gymsDispatch, newRoute, gym).then(
        (response: Response) => {
          if (response instanceof Response && response.ok) {
            handleClose();
          } else {
            toast.error("Error updating route.");
          }
        }
      );
    }
  };

  return (
    <TransitionModal
      open={open}
      handleClose={handleClose}
      style={{ width: "475px" }}
    >
      <RouteForm
        formHeadText="Edit route"
        route={updatedRoute}
        handleCancel={handleClose}
        handleSubmit={handleSubmit}
        submitButtonText="Save"
        nameMessage={nameMessage}
        typesMessage={typesMessage}
      />
    </TransitionModal>
  );
};

export default RouteEditPage;
