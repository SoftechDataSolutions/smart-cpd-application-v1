import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QuizHistory from './quiz-history';
import QuizHistoryDetail from './quiz-history-detail';
import QuizHistoryUpdate from './quiz-history-update';
import QuizHistoryDeleteDialog from './quiz-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuizHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuizHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuizHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={QuizHistory} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={QuizHistoryDeleteDialog} />
  </>
);

export default Routes;
