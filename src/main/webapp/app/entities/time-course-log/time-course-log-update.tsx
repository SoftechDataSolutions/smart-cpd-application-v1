import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntity, updateEntity, createEntity, reset } from './time-course-log.reducer';
import { ITimeCourseLog } from 'app/shared/model/time-course-log.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITimeCourseLogUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITimeCourseLogUpdateState {
  isNew: boolean;
  customerId: number;
  courseId: number;
}

export class TimeCourseLogUpdate extends React.Component<ITimeCourseLogUpdateProps, ITimeCourseLogUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      courseId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
    this.props.getCourses();
  }

  saveEntity = (event, errors, values) => {
    values.loggedin = new Date(values.loggedin);
    values.loggedout = new Date(values.loggedout);

    if (errors.length === 0) {
      const { timeCourseLogEntity } = this.props;
      const entity = {
        ...timeCourseLogEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/time-course-log');
  };

  render() {
    const { timeCourseLogEntity, customers, courses, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.timeCourseLog.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.timeCourseLog.home.createOrEditLabel">Create or edit a TimeCourseLog</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : timeCourseLogEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="time-course-log-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="loggedinLabel" for="loggedin">
                    <Translate contentKey="smartcpdv1App.timeCourseLog.loggedin">Loggedin</Translate>
                  </Label>
                  <AvInput
                    id="time-course-log-loggedin"
                    type="datetime-local"
                    className="form-control"
                    name="loggedin"
                    value={isNew ? null : convertDateTimeFromServer(this.props.timeCourseLogEntity.loggedin)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="loggedoutLabel" for="loggedout">
                    <Translate contentKey="smartcpdv1App.timeCourseLog.loggedout">Loggedout</Translate>
                  </Label>
                  <AvInput
                    id="time-course-log-loggedout"
                    type="datetime-local"
                    className="form-control"
                    name="loggedout"
                    value={isNew ? null : convertDateTimeFromServer(this.props.timeCourseLogEntity.loggedout)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="timespentLabel" for="timespent">
                    <Translate contentKey="smartcpdv1App.timeCourseLog.timespent">Timespent</Translate>
                  </Label>
                  <AvField id="time-course-log-timespent" type="number" className="form-control" name="timespent" />
                </AvGroup>
                <AvGroup>
                  <Label for="customer.normalized">
                    <Translate contentKey="smartcpdv1App.timeCourseLog.customer">Customer</Translate>
                  </Label>
                  <AvInput id="time-course-log-customer" type="select" className="form-control" name="customer.id">
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.normalized}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="course.title">
                    <Translate contentKey="smartcpdv1App.timeCourseLog.course">Course</Translate>
                  </Label>
                  <AvInput id="time-course-log-course" type="select" className="form-control" name="course.id">
                    <option value="" key="0" />
                    {courses
                      ? courses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/time-course-log" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  courses: storeState.course.entities,
  timeCourseLogEntity: storeState.timeCourseLog.entity,
  loading: storeState.timeCourseLog.loading,
  updating: storeState.timeCourseLog.updating
});

const mapDispatchToProps = {
  getCustomers,
  getCourses,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeCourseLogUpdate);
