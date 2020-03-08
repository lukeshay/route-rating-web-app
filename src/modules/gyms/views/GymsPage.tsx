import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as GymsActions from '../../../context/gyms/gymsActions';
import { useGymsContext } from '../../../context/gyms/gymsStore';
import { Routes } from '../../../routes';
import { Events } from '../../../types';
import Input from '../../common/inputs/Input';
import { useViewContext } from '../../../context/view/viewStore';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import GymsList from './components/GymsList';

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    card: {
      borderRadius: '10px',
      height: '233px',
      width: '700px',
      display: 'flex',
    },
    cardWrapper: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: '10px',
      paddingTop: '10px',
      width: '100%',
    },
    information: {
      paddingBottom: '5px',
      paddingLeft: '10px',
      paddingTop: '5px',
    },
    photo: {
      borderRadius: '10px',
      height: '96%',
    },
    photoWrapper: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      width: '50%',
    },
    root: {
      width: '100%',
    },
    search: {
      width: '50%',
    },
    searchMobile: {
      width: '96%',
    },
  })
);

const GymsPage: React.FC = (): JSX.Element => {
  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: viewState } = useViewContext();

  const history = useHistory();

  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);

  const classes = useStyles();

  const loadGyms = (query, page): void => {
    GymsActions.loadGymsQuery(gymsDispatch, query, page).then((response) => {
      if (!response || !(response instanceof Response) || !response.ok) {
        toast.error('Error getting gyms.');
      }
    });
  };

  React.useEffect(() => {
    if (
      !gymsState.page ||
      !gymsState.page.content ||
      gymsState.page.content.length === 0
    ) {
      loadGyms('', page);
    }
  }, []);

  const searchClass = (): string => {
    return viewState.mobile ? classes.searchMobile : classes.search;
  };

  const handleSearchChange = (event: Events.InputEvent): void => {
    const { value } = event.target;
    setSearch(value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ): void => {
    const newPage = page + newValue - 1;
    if (newPage >= 0 && newPage < gymsState.page.totalPages) {
      setPage(newPage);
      loadGyms(search, page + newValue - 1);
    }
  };

  const handleKeyPress = (event: Events.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      loadGyms(search, page);
    }
  };

  const handleRowPress = (id: string): void =>
    history.push(Routes.GYMS + '/' + id);

  return (
    <div className={classes.root} data-test-id="gym-page-test-id">
      <div className={classes.div}>
        <Input
          className={searchClass()}
          fullWidth={false}
          id="search"
          name="search"
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="Search"
          type="text"
          value={search}
        />
      </div>
      <GymsList
        cardClass={classes.card}
        gyms={gymsState.page.content || []}
        mobile={viewState.mobile}
        onClick={handleRowPress}
      />
      <Paper>
        <Tabs
          value={1}
          id="page"
          onChange={handlePageChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="<" />
          <Tab label={page + 1} />
          <Tab label=">" />
        </Tabs>
      </Paper>
    </div>
  );
};

export default React.memo(GymsPage);
