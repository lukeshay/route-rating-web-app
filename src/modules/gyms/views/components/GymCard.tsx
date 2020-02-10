import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  createStyles,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { Gym } from "../../../../types";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      borderRadius: "10px",
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
    }
  })
);

const useMobileStyles = makeStyles(() =>
  createStyles({
    card: {
      borderRadius: "5px"
    },
    cardWrapper: {
      paddingBottom: "10px",
      paddingTop: "10px",
      width: "100%"
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

interface IGymCardVariantsProps {
  cardClass?: string;
  gym: Gym;
  onClick?(even: any): void;
}

const GymCardDesktop: React.FC<IGymCardVariantsProps> = ({
  cardClass,
  gym,
  onClick
}): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.cardWrapper} onClick={onClick}>
      <Card className={cardClass || classes.card} data-test-id="gym-card-test-id">
        <CardMedia className={classes.photoWrapper}>
          <img
            src={"https://" + gym.photoUrl}
            alt="This gym does not have a photo."
            className={classes.photo}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h4">{gym.name}</Typography>
          <div className={classes.information}>
            <Typography variant="body1">{gym.website}</Typography>
            <Typography variant="body1">
              {gym.address}
              <br />
              {gym.city + ", " + gym.state + " " + gym.zipCode}
            </Typography>
            <Typography variant="body1">{gym.email}</Typography>
            <Typography variant="body1">{gym.phoneNumber}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GymCardMobile: React.FC<IGymCardVariantsProps> = ({
  gym,
  onClick
}): JSX.Element => {
  const classes = useMobileStyles();

  return (
    <div className={classes.cardWrapper} onClick={onClick}>
      <Card className={classes.card} data-test-id="gym-card-test-id">
        <CardMedia
          className={classes.photoWrapper}
          style={{
            height: `${window.innerWidth * (2 / 3) - 10}px`
          }}
        >
          <img
            className={classes.photo}
            src={"https://" + gym.photoUrl}
            alt="This gym does not have a photo."
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h4">{gym.name}</Typography>
          <div>
            <Typography variant="body1">{gym.website}</Typography>
            <Typography variant="body1">
              {gym.address}
              <br />
              {gym.city + ", " + gym.state + " " + gym.zipCode}
            </Typography>
            <Typography variant="body1">{gym.email}</Typography>
            <Typography variant="body1">{gym.phoneNumber}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export interface IGymCardProps {
  desktopCardClass?: string;
  gym: Gym;
  mobile: boolean;
  mobileCardClass?: string;
  onClick?(even: any): void;
}

const GymCard: React.FC<IGymCardProps> = ({
  desktopCardClass,
  gym,
  mobile,
  mobileCardClass,
  onClick
}) => {
  return mobile ? (
    <GymCardMobile gym={gym} onClick={onClick} cardClass={mobileCardClass} />
  ) : (
    <GymCardDesktop gym={gym} onClick={onClick} cardClass={desktopCardClass} />
  );
};

export default GymCard;
