import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '../buttons/ButtonSecondary';
import { StandardProps } from '../standardProps';
import { ButtonEvent } from '../../../types';

export interface FormProps extends StandardProps {
  buttonText: string;
  disabled?: boolean;
  formInputs: React.ReactNode;
  helpElements?: React.ReactNode[];
  icon?: React.ReactNode;
  title: React.ReactNode;
  handleSubmit(event: ButtonEvent): Promise<void> | void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(1),
    },
    form: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(1),
      width: '100%',
    },
    paper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

const Form: React.FC<FormProps> = ({
  buttonText,
  disabled,
  formInputs,
  handleSubmit,
  helpElements,
  icon,
  testId,
  title,
  id,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" data-test-id={testId}>
      <div className={classes.paper}>
        {icon}
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          data-testid={`${id}-form-test-id`}
        >
          {formInputs}
          <Button
            id="submit"
            type="submit"
            fullWidth={true}
            variant="contained"
            data-test-id="submit-button-test-id"
            disabled={disabled}
          >
            {buttonText}
          </Button>
          <Grid container>
            {helpElements &&
              helpElements.map((element) => (
                // eslint-disable-next-line react/jsx-key
                <Grid item>{element}</Grid>
              ))}
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Form;
