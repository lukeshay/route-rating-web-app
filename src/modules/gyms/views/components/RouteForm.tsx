import {
  Button,
  createStyles,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { Route, WallTypes, Events } from '../../../../types';
import Form from '../../../common/forms/Form';
import CheckBox from '../../../common/inputs/CheckBox';
import Input from '../../../common/inputs/Input';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helpText: {
      color: theme.palette.error.main,
      padding: '5px',
    },
  })
);

export interface RouteFormProps {
  route: Route;
  formHeadText: string;
  nameMessage?: string;
  submitButtonText: string;
  typesMessage?: string;
  typeOptions: WallTypes[];
  handleCancel(event: Events.ButtonEvent): Promise<void> | void;
  handleSubmit(route: Route): Promise<void> | void;
}

const RouteForm: React.FC<RouteFormProps> = ({
  route,
  formHeadText,
  nameMessage,
  submitButtonText,
  typesMessage,
  typeOptions,
  handleCancel,
  handleSubmit,
}): JSX.Element => {
  const classes = useStyles();

  const [name, setName] = React.useState<string>(route.name || '');
  const [setter, setSetter] = React.useState<string>(route.setter || '');

  const [lead, setLead] = React.useState<boolean>(
    route.types &&
      route.types.filter((element) => element === 'LEAD').length > 0
  );
  const [topRope, setTopRope] = React.useState<boolean>(
    route.types &&
      route.types.filter((element) => element === 'TOP_ROPE').length > 0
  );
  const [autoBelay, setAutoBelay] = React.useState<boolean>(
    route.types &&
      route.types.filter((element) => element === 'AUTO_BELAY').length > 0
  );
  const [boulder, setBoulder] = React.useState<boolean>(
    route.types &&
      route.types.filter((element) => element === 'BOULDER').length > 0
  );
  const [holdColor, setHoldColor] = React.useState<string>(
    route.holdColor || ''
  );

  const onSubmit = (event: Events.FormEvent): void => {
    event.preventDefault();

    const types: string[] = [];

    if (lead) {
      types.push('LEAD');
    }

    if (topRope) {
      types.push('TOP_ROPE');
    }

    if (autoBelay) {
      types.push('AUTO_BELAY');
    }

    if (boulder) {
      types.push('BOULDER');
    }

    handleSubmit({ name, setter, holdColor, types } as Route);
  };

  const handleChange = async (event: Events.InputEvent): Promise<void> => {
    const { id, value } = event.target;

    if (id === 'name') {
      setName(value);
    } else if (id === 'topRope') {
      setTopRope(!topRope);
    } else if (id === 'lead') {
      setLead(!lead);
    } else if (id === 'autoBelay') {
      setAutoBelay(!autoBelay);
    } else if (id === 'boulder') {
      setBoulder(!boulder);
    } else if (id === 'setter') {
      setSetter(value);
    } else if (id === 'holdColor') {
      setHoldColor(value);
    }
  };

  const FormHead: JSX.Element = (
    <div style={{ display: 'inline' }}>
      <div style={{ float: 'left', marginRight: '25px', marginTop: '5px' }}>
        {formHeadText}
      </div>
      <div style={{ float: 'right', marginLeft: '25px' }}>
        <Button onClick={handleCancel} type="button" variant="outlined">
          Cancel
        </Button>
      </div>
    </div>
  );

  const FormInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="Name"
        id="name"
        value={name}
        onChange={handleChange}
        type="text"
        autoComplete="title"
        autoCapitalize="true"
        helpText={nameMessage}
      />
      <Input
        placeholder="Setter"
        id="setter"
        value={setter}
        onChange={handleChange}
        type="text"
        autoComplete="name"
        autoCapitalize="true"
      />
      <Input
        placeholder="Hold Color"
        id="holdColor"
        value={holdColor}
        onChange={handleChange}
        type="text"
        autoCapitalize="true"
      />
      <FormLabel component="legend">Pick one</FormLabel>
      <FormGroup>
        {typeOptions.includes(WallTypes.TOP_ROPE) && (
          <CheckBox
            id="topRope"
            checked={topRope}
            value={WallTypes.TOP_ROPE}
            label="Top rope"
            onChange={handleChange}
            color="primary"
          />
        )}
        {typeOptions.includes(WallTypes.LEAD) && (
          <CheckBox
            id="lead"
            checked={lead}
            value={WallTypes.LEAD}
            label="Lead"
            onChange={handleChange}
            color="primary"
          />
        )}
        {typeOptions.includes(WallTypes.AUTO_BELAY) && (
          <CheckBox
            id="autoBelay"
            checked={autoBelay}
            value={WallTypes.AUTO_BELAY}
            label="Auto belay"
            onChange={handleChange}
            color="primary"
          />
        )}
        {typeOptions.includes(WallTypes.BOULDER) && (
          <CheckBox
            id="boulder"
            checked={boulder}
            value={WallTypes.BOULDER}
            label="Boulder"
            onChange={handleChange}
            color="primary"
          />
        )}
        <FormHelperText className={classes.helpText}>
          {typesMessage}
        </FormHelperText>
      </FormGroup>
    </React.Fragment>
  );

  return (
    <Form
      id="route"
      title={FormHead}
      formInputs={FormInputs}
      buttonText={submitButtonText}
      handleSubmit={onSubmit}
    />
  );
};

export default RouteForm;
