import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Quiz from './quiz';
import QuizDetail from './quiz-detail';
import QuizUpdate from './quiz-update';
import QuizDeleteDialog from './quiz-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuizUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuizUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuizDetail} />
      <ErrorBoundaryRoute path={match.url} component={Quiz} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={QuizDeleteDialog} />
  </>
);

export default Routes;
