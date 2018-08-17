import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './course-cart-bridge.reducer';
import { ICourseCartBridge } from 'app/shared/model/course-cart-bridge.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourseCartBridgeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CourseCartBridgeDetail extends React.Component<ICourseCartBridgeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courseCartBridgeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.courseCartBridge.detail.title">CourseCartBridge</Translate> [<b>
              {courseCartBridgeEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="timestamp">
                <Translate contentKey="smartcpdv1App.courseCartBridge.timestamp">Timestamp</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={courseCartBridgeEntity.timestamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="smartcpdv1App.courseCartBridge.cart">Cart</Translate>
            </dt>
            <dd>{courseCartBridgeEntity.cart ? courseCartBridgeEntity.cart.normCart : ''}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.courseCartBridge.course">Course</Translate>
            </dt>
            <dd>{courseCartBridgeEntity.course ? courseCartBridgeEntity.course.normCourses : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/course-cart-bridge" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/course-cart-bridge/${courseCartBridgeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ courseCartBridge }: IRootState) => ({
  courseCartBridgeEntity: courseCartBridge.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseCartBridgeDetail);
