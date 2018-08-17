import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Choice from './choice';
import ChoiceDetail from './choice-detail';
import ChoiceUpdate from './choice-update';
import ChoiceDeleteDialog from './choice-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChoiceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChoiceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChoiceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Choice} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChoiceDeleteDialog} />
  </>
);

export default Routes;
