import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './time-course-log.reducer';
import { ITimeCourseLog } from 'app/shared/model/time-course-log.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITimeCourseLogDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TimeCourseLogDetail extends React.Component<ITimeCourseLogDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { timeCourseLogEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.timeCourseLog.detail.title">TimeCourseLog</Translate> [<b>{timeCourseLogEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="loggedin">
                <Translate contentKey="smartcpdv1App.timeCourseLog.loggedin">Loggedin</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={timeCourseLogEntity.loggedin} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="loggedout">
                <Translate contentKey="smartcpdv1App.timeCourseLog.loggedout">Loggedout</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={timeCourseLogEntity.loggedout} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="timespent">
                <Translate contentKey="smartcpdv1App.timeCourseLog.timespent">Timespent</Translate>
              </span>
            </dt>
            <dd>{timeCourseLogEntity.timespent}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.timeCourseLog.customer">Customer</Translate>
            </dt>
            <dd>{timeCourseLogEntity.customer ? timeCourseLogEntity.customer.normalized : ''}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.timeCourseLog.course">Course</Translate>
            </dt>
            <dd>{timeCourseLogEntity.course ? timeCourseLogEntity.course.title : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/time-course-log" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/time-course-log/${timeCourseLogEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ timeCourseLog }: IRootState) => ({
  timeCourseLogEntity: timeCourseLog.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeCourseLogDetail);
