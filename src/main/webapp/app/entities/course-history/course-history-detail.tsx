import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './course-history.reducer';
import { ICourseHistory } from 'app/shared/model/course-history.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourseHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CourseHistoryDetail extends React.Component<ICourseHistoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courseHistoryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.courseHistory.detail.title">CourseHistory</Translate> [<b>{courseHistoryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="startdate">
                <Translate contentKey="smartcpdv1App.courseHistory.startdate">Startdate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={courseHistoryEntity.startdate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastactivedate">
                <Translate contentKey="smartcpdv1App.courseHistory.lastactivedate">Lastactivedate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={courseHistoryEntity.lastactivedate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="isactive">
                <Translate contentKey="smartcpdv1App.courseHistory.isactive">Isactive</Translate>
              </span>
            </dt>
            <dd>{courseHistoryEntity.isactive ? 'true' : 'false'}</dd>
            <dt>
              <span id="iscompleted">
                <Translate contentKey="smartcpdv1App.courseHistory.iscompleted">Iscompleted</Translate>
              </span>
            </dt>
            <dd>{courseHistoryEntity.iscompleted ? 'true' : 'false'}</dd>
            <dt>
              <span id="access">
                <Translate contentKey="smartcpdv1App.courseHistory.access">Access</Translate>
              </span>
            </dt>
            <dd>{courseHistoryEntity.access ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.courseHistory.customer">Customer</Translate>
            </dt>
            <dd>{courseHistoryEntity.customer ? courseHistoryEntity.customer.normalized : ''}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.courseHistory.course">Course</Translate>
            </dt>
            <dd>{courseHistoryEntity.course ? courseHistoryEntity.course.normCourses : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/course-history" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/course-history/${courseHistoryEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ courseHistory }: IRootState) => ({
  courseHistoryEntity: courseHistory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseHistoryDetail);
