import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TimeCourseLog from './time-course-log';
import TimeCourseLogDetail from './time-course-log-detail';
import TimeCourseLogUpdate from './time-course-log-update';
import TimeCourseLogDeleteDialog from './time-course-log-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TimeCourseLogUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TimeCourseLogUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TimeCourseLogDetail} />
      <ErrorBoundaryRoute path={match.url} component={TimeCourseLog} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TimeCourseLogDeleteDialog} />
  </>
);

export default Routes;
