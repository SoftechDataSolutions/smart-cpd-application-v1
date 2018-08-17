import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntity, updateEntity, createEntity, reset } from './course-history.reducer';
import { ICourseHistory } from 'app/shared/model/course-history.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICourseHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICourseHistoryUpdateState {
  isNew: boolean;
  customerId: number;
  courseId: number;
}

export class CourseHistoryUpdate extends React.Component<ICourseHistoryUpdateProps, ICourseHistoryUpdateState> {
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
    values.startdate = new Date(values.startdate);
    values.lastactivedate = new Date(values.lastactivedate);

    if (errors.length === 0) {
      const { courseHistoryEntity } = this.props;
      const entity = {
        ...courseHistoryEntity,
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
    this.props.history.push('/entity/course-history');
  };

  render() {
    const { courseHistoryEntity, customers, courses, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.courseHistory.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.courseHistory.home.createOrEditLabel">Create or edit a CourseHistory</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courseHistoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="course-history-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startdateLabel" for="startdate">
                    <Translate contentKey="smartcpdv1App.courseHistory.startdate">Startdate</Translate>
                  </Label>
                  <AvInput
                    id="course-history-startdate"
                    type="datetime-local"
                    className="form-control"
                    name="startdate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.courseHistoryEntity.startdate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastactivedateLabel" for="lastactivedate">
                    <Translate contentKey="smartcpdv1App.courseHistory.lastactivedate">Lastactivedate</Translate>
                  </Label>
                  <AvInput
                    id="course-history-lastactivedate"
                    type="datetime-local"
                    className="form-control"
                    name="lastactivedate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.courseHistoryEntity.lastactivedate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="isactiveLabel" check>
                    <AvInput id="course-history-isactive" type="checkbox" className="form-control" name="isactive" />
                    <Translate contentKey="smartcpdv1App.courseHistory.isactive">Isactive</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="iscompletedLabel" check>
                    <AvInput id="course-history-iscompleted" type="checkbox" className="form-control" name="iscompleted" />
                    <Translate contentKey="smartcpdv1App.courseHistory.iscompleted">Iscompleted</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="accessLabel" check>
                    <AvInput id="course-history-access" type="checkbox" className="form-control" name="access" />
                    <Translate contentKey="smartcpdv1App.courseHistory.access">Access</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.normalized">
                    <Translate contentKey="smartcpdv1App.courseHistory.customer">Customer</Translate>
                  </Label>
                  <AvInput id="course-history-customer" type="select" className="form-control" name="customer.id">
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
                  <Label for="course.normCourses">
                    <Translate contentKey="smartcpdv1App.courseHistory.course">Course</Translate>
                  </Label>
                  <AvInput id="course-history-course" type="select" className="form-control" name="course.id">
                    <option value="" key="0" />
                    {courses
                      ? courses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.normCourses}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/course-history" replace color="info">
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
  courseHistoryEntity: storeState.courseHistory.entity,
  loading: storeState.courseHistory.loading,
  updating: storeState.courseHistory.updating
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
)(CourseHistoryUpdate);
