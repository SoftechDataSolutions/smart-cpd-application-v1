import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICart } from 'app/shared/model/cart.model';
import { getEntities as getCarts } from 'app/entities/cart/cart.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntity, updateEntity, createEntity, reset } from './course-cart-bridge.reducer';
import { ICourseCartBridge } from 'app/shared/model/course-cart-bridge.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICourseCartBridgeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICourseCartBridgeUpdateState {
  isNew: boolean;
  cartId: number;
  courseId: number;
}

export class CourseCartBridgeUpdate extends React.Component<ICourseCartBridgeUpdateProps, ICourseCartBridgeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cartId: 0,
      courseId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCarts();
    this.props.getCourses();
  }

  saveEntity = (event, errors, values) => {
    values.timestamp = new Date(values.timestamp);

    if (errors.length === 0) {
      const { courseCartBridgeEntity } = this.props;
      const entity = {
        ...courseCartBridgeEntity,
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
    this.props.history.push('/entity/course-cart-bridge');
  };

  render() {
    const { courseCartBridgeEntity, carts, courses, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.courseCartBridge.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.courseCartBridge.home.createOrEditLabel">Create or edit a CourseCartBridge</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courseCartBridgeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="course-cart-bridge-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="timestampLabel" for="timestamp">
                    <Translate contentKey="smartcpdv1App.courseCartBridge.timestamp">Timestamp</Translate>
                  </Label>
                  <AvInput
                    id="course-cart-bridge-timestamp"
                    type="datetime-local"
                    className="form-control"
                    name="timestamp"
                    value={isNew ? null : convertDateTimeFromServer(this.props.courseCartBridgeEntity.timestamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="cart.normCart">
                    <Translate contentKey="smartcpdv1App.courseCartBridge.cart">Cart</Translate>
                  </Label>
                  <AvInput id="course-cart-bridge-cart" type="select" className="form-control" name="cart.id">
                    <option value="" key="0" />
                    {carts
                      ? carts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.normCart}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="course.normCourses">
                    <Translate contentKey="smartcpdv1App.courseCartBridge.course">Course</Translate>
                  </Label>
                  <AvInput id="course-cart-bridge-course" type="select" className="form-control" name="course.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/course-cart-bridge" replace color="info">
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
  carts: storeState.cart.entities,
  courses: storeState.course.entities,
  courseCartBridgeEntity: storeState.courseCartBridge.entity,
  loading: storeState.courseCartBridge.loading,
  updating: storeState.courseCartBridge.updating
});

const mapDispatchToProps = {
  getCarts,
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
)(CourseCartBridgeUpdate);
