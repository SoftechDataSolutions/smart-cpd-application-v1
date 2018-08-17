import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QuestionHistory from './question-history';
import QuestionHistoryDetail from './question-history-detail';
import QuestionHistoryUpdate from './question-history-update';
import QuestionHistoryDeleteDialog from './question-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuestionHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuestionHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuestionHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={QuestionHistory} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={QuestionHistoryDeleteDialog} />
  </>
);

export default Routes;
