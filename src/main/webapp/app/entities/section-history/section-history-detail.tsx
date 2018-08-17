import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './section-history.reducer';
import { ISectionHistory } from 'app/shared/model/section-history.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISectionHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class SectionHistoryDetail extends React.Component<ISectionHistoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { sectionHistoryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.sectionHistory.detail.title">SectionHistory</Translate> [<b>{sectionHistoryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="startdate">
                <Translate contentKey="smartcpdv1App.sectionHistory.startdate">Startdate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={sectionHistoryEntity.startdate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastactivedate">
                <Translate contentKey="smartcpdv1App.sectionHistory.lastactivedate">Lastactivedate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={sectionHistoryEntity.lastactivedate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="watched">
                <Translate contentKey="smartcpdv1App.sectionHistory.watched">Watched</Translate>
              </span>
            </dt>
            <dd>{sectionHistoryEntity.watched ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.sectionHistory.customer">Customer</Translate>
            </dt>
            <dd>{sectionHistoryEntity.customer ? sectionHistoryEntity.customer.normalized : ''}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.sectionHistory.section">Section</Translate>
            </dt>
            <dd>{sectionHistoryEntity.section ? sectionHistoryEntity.section.normSection : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/section-history" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/section-history/${sectionHistoryEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ sectionHistory }: IRootState) => ({
  sectionHistoryEntity: sectionHistory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionHistoryDetail);
