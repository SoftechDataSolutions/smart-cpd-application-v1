import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CourseCartBridge from './course-cart-bridge';
import CourseCartBridgeDetail from './course-cart-bridge-detail';
import CourseCartBridgeUpdate from './course-cart-bridge-update';
import CourseCartBridgeDeleteDialog from './course-cart-bridge-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CourseCartBridgeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CourseCartBridgeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CourseCartBridgeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CourseCartBridge} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CourseCartBridgeDeleteDialog} />
  </>
);

export default Routes;
