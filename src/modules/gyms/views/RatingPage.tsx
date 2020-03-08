import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { Route } from '../../../types';
import * as GradeUtils from '../../../utils/gradeUtils';
import * as WallUtils from '../../../utils/wallUtils';
import Table from '../../common/table/Table';

interface RouteInformationRowProps {
  label: React.ReactNode;
  text: React.ReactNode;
}

const RouteInformationRow: React.FC<RouteInformationRowProps> = ({
  label,
  text,
}): JSX.Element => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>{text}</TableCell>
  </TableRow>
);

export interface RatingPageProps {
  route: Route;
}

const RatingPage: React.FunctionComponent<RatingPageProps> = ({
  route,
}): JSX.Element => {
  // const [ratings, setRatings] = React.useState<RouteRating[]>([]);
  const { name, averageGrade, averageRating, setter, holdColor } = route;
  const types = WallUtils.typesAsString(route.types);

  // React.useEffect(() => {
  //   RouteRatingsApi.getRouteRatings(id).then((response: Response) => {
  //     if (response instanceof Response && response.ok) {
  //       response.json().then((body: RouteRating[]) => {
  //         setRatings(body);
  //       });
  //     } else {
  //       toast.error("Error getting ratings.");
  //     }
  //   });
  // }, []);

  return (
    <Table
      id="rating"
      body={[
        <RouteInformationRow key="route" label="Route" text={name} />,
        <RouteInformationRow key="type" label="Type" text={types} />,
        <RouteInformationRow key="setter" label="Setter" text={setter} />,
        <RouteInformationRow key="color" label="Route" text={holdColor} />,
        <RouteInformationRow
          key="grade"
          label="Average Grade"
          text={averageGrade && GradeUtils.convertGradeToString(averageGrade)}
        />,
        <RouteInformationRow
          key="rating"
          label="Average Rating"
          text={averageRating > 0 && Math.round(averageRating * 10) / 10}
        />,
      ]}
      testId="rating-table-test-id"
    />
  );
};

export default RatingPage;
