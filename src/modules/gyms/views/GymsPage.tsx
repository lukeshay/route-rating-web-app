import {
  createStyles,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import Input from "../../common/inputs/Input";
import { useViewContext } from "../../../context/view/viewStore";
import GymCard from "./components/GymCard";

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    },
    card: {
      borderRadius: "10px",
      height: "233px",
      width: "700px",
      display: "flex"
    },
    cardWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      paddingBottom: "10px",
      paddingTop: "10px",
      width: "100%"
    },
    information: {
      paddingBottom: "5px",
      paddingLeft: "10px",
      paddingTop: "5px"
    },
    photo: {
      borderRadius: "10px",
      height: "96%"
    },
    photoWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "50%"
    },
    root: {
      width: "100%"
    },
    search: {
      width: "50%"
    },
    searchMobile: {
      width: "96%"
    }
  })
);

const useMobileStyles = makeStyles(() =>
  createStyles({
    card: {
      borderRadius: "5px"
    },
    photo: {
      borderRadius: "10px",
      height: "96%"
    },
    photoWrapper: {
      alignItems: "center",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    }
  })
);

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

const GymsPage: React.FC = (): JSX.Element => {
  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: viewState } = useViewContext();

  const history = useHistory();

  const [search, setSearch] = React.useState<string>("");

  const classes = useStyles();

  const loadGyms = (): void => {
    if (gymsState.gyms.length === 0) {
      GymsActions.loadGymsQuery(gymsDispatch, "").then((response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gyms.");
        }
      });
    }
  };

  React.useEffect(() => {
    loadGyms();
  }, []);

  const searchClass = (): string => {
    return viewState.mobile ? classes.searchMobile : classes.search;
  };

  const handleKeyPress = (event: any): void => {
    if (event.key === "Enter") {
      GymsActions.loadGymsQuery(gymsDispatch, search).then((response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gyms.");
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.div}>
        <Input
          className={searchClass()}
          type="text"
          id="search"
          placeholder="Search"
          fullWidth={false}
          onChange={(event: any): void => {
            setSearch(event.target.value);
          }}
          value={search}
          name="search"
          onKeyPress={handleKeyPress}
        />
      </div>
      <GymsList
        cardClass={classes.card}
        gyms={gymsState.gyms}
        mobile={viewState.mobile}
        onClick={(id: any): void => history.push(Routes.GYMS + "/" + id)}
      />
    </div>
  );
};

export default React.memo(GymsPage);
