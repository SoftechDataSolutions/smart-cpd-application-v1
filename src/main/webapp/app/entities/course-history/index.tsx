import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CourseHistory from './course-history';
import CourseHistoryDetail from './course-history-detail';
import CourseHistoryUpdate from './course-history-update';
import CourseHistoryDeleteDialog from './course-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CourseHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CourseHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CourseHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={CourseHistory} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CourseHistoryDeleteDialog} />
  </>
);

export default Routes;
