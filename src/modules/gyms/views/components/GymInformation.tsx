import {
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes, Routes } from "../../../../routes";
import { Gym } from "../../../../types";
import GymCard from "./GymCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    card: {
      borderRadius: "10px",
      height: "350px",
      width: "90%",
      display: "flex"
    },
    content: {
      flex: "1 0 auto"
    },
    editButton: {
      position: "absolute",
      right: "10px"
    },
    icons: {
      paddingRight: theme.spacing(1)
    },
    information: {
      paddingLeft: theme.spacing(2)
    },
    photo: {
      width: "100%"
    },
    photoWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "50%"
    }
  })
);

export interface IGymInformationProps {
  gym: Gym;
  canEdit: boolean;
  mobile: boolean;
}

const GymInformation: React.FunctionComponent<IGymInformationProps> = ({
  gym,
  canEdit,
  mobile
}): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.buttonWrapper}>
        <Button
          component={Link}
          to={Routes.GYMS}
          variant="text"
          fullWidth={false}
          size="medium"
          type="button"
        >
          <ArrowBackIcon className={classes.icons} />
          Back
        </Button>
        {canEdit && (
          <Button
            component={Link}
            to={AuthRoutes.EDIT_GYM + "/" + gym.id}
            className={classes.editButton}
            variant="text"
            fullWidth={false}
            size="medium"
            type="button"
          >
            <EditIcon className={classes.icons} />
            Edit
          </Button>
        )}
      </div>
      <GymCard mobile={mobile} gym={gym} desktopCardClass={classes.card} />
    </React.Fragment>
  );
};

export default GymInformation;
