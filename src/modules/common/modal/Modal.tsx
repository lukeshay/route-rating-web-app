import {
  Backdrop,
  Fade,
  Modal,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { IStandardProps } from "../standardProps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      outline: 0
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      outline: 0,
      padding: theme.spacing(2, 4, 3)
    }
  })
);

export interface ITransitionModalProps extends IStandardProps {
  open: boolean;
  children: React.ReactNode;
  style?: any;
  handleClose?(): Promise<void> | void;
}

const TransitionModal: React.FC<ITransitionModalProps> = ({
  open,
  handleClose,
  style,
  id,
  children
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      data-testid={`${id}-modal-test-id`}
    >
      <Fade in={open}>
        <div className={classes.paper} style={style}>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default TransitionModal;
