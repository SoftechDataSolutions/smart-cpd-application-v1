import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './customer';
import Company from './company';
import Topic from './topic';
import Course from './course';
import CourseCartBridge from './course-cart-bridge';
import Section from './section';
import Quiz from './quiz';
import Question from './question';
import Choice from './choice';
import CourseHistory from './course-history';
import QuestionHistory from './question-history';
import SectionHistory from './section-history';
import QuizHistory from './quiz-history';
import Orders from './orders';
import Cart from './cart';
import TimeCourseLog from './time-course-log';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}/company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}/topic`} component={Topic} />
      <ErrorBoundaryRoute path={`${match.url}/course`} component={Course} />
      <ErrorBoundaryRoute path={`${match.url}/course-cart-bridge`} component={CourseCartBridge} />
      <ErrorBoundaryRoute path={`${match.url}/section`} component={Section} />
      <ErrorBoundaryRoute path={`${match.url}/quiz`} component={Quiz} />
      <ErrorBoundaryRoute path={`${match.url}/question`} component={Question} />
      <ErrorBoundaryRoute path={`${match.url}/choice`} component={Choice} />
      <ErrorBoundaryRoute path={`${match.url}/course-history`} component={CourseHistory} />
      <ErrorBoundaryRoute path={`${match.url}/question-history`} component={QuestionHistory} />
      <ErrorBoundaryRoute path={`${match.url}/section-history`} component={SectionHistory} />
      <ErrorBoundaryRoute path={`${match.url}/quiz-history`} component={QuizHistory} />
      <ErrorBoundaryRoute path={`${match.url}/orders`} component={Orders} />
      <ErrorBoundaryRoute path={`${match.url}/cart`} component={Cart} />
      <ErrorBoundaryRoute path={`${match.url}/time-course-log`} component={TimeCourseLog} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
