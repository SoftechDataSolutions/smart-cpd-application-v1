import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SectionHistory from './section-history';
import SectionHistoryDetail from './section-history-detail';
import SectionHistoryUpdate from './section-history-update';
import SectionHistoryDeleteDialog from './section-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SectionHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SectionHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SectionHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={SectionHistory} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SectionHistoryDeleteDialog} />
  </>
);

export default Routes;
