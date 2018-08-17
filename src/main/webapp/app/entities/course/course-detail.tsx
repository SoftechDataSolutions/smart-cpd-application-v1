import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './course.reducer';
import { ICourse } from 'app/shared/model/course.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CourseDetail extends React.Component<ICourseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { courseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.course.detail.title">Course</Translate> [<b>{courseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="smartcpdv1App.course.title">Title</Translate>
              </span>
            </dt>
            <dd>{courseEntity.title}</dd>
            <dt>
              <span id="section">
                <Translate contentKey="smartcpdv1App.course.section">Section</Translate>
              </span>
            </dt>
            <dd>{courseEntity.section}</dd>
            <dt>
              <span id="normCourses">
                <Translate contentKey="smartcpdv1App.course.normCourses">Norm Courses</Translate>
              </span>
            </dt>
            <dd>{courseEntity.normCourses}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="smartcpdv1App.course.description">Description</Translate>
              </span>
            </dt>
            <dd>{courseEntity.description}</dd>
            <dt>
              <span id="amount">
                <Translate contentKey="smartcpdv1App.course.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{courseEntity.amount}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="smartcpdv1App.course.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {courseEntity.image ? (
                <div>
                  <a onClick={openFile(courseEntity.imageContentType, courseEntity.image)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {courseEntity.imageContentType}, {byteSize(courseEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="startdate">
                <Translate contentKey="smartcpdv1App.course.startdate">Startdate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={courseEntity.startdate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="enddate">
                <Translate contentKey="smartcpdv1App.course.enddate">Enddate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={courseEntity.enddate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="point">
                <Translate contentKey="smartcpdv1App.course.point">Point</Translate>
              </span>
            </dt>
            <dd>{courseEntity.point}</dd>
            <dt>
              <span id="credit">
                <Translate contentKey="smartcpdv1App.course.credit">Credit</Translate>
              </span>
            </dt>
            <dd>{courseEntity.credit}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="smartcpdv1App.course.country">Country</Translate>
              </span>
            </dt>
            <dd>{courseEntity.country}</dd>
            <dt>
              <span id="state">
                <Translate contentKey="smartcpdv1App.course.state">State</Translate>
              </span>
            </dt>
            <dd>{courseEntity.state}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.course.topic">Topic</Translate>
            </dt>
            <dd>{courseEntity.topic ? courseEntity.topic.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/course" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/course/${courseEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ course }: IRootState) => ({
  courseEntity: course.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetail);
