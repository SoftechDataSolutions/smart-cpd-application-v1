import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './topic.reducer';
import { ITopic } from 'app/shared/model/topic.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITopicDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TopicDetail extends React.Component<ITopicDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { topicEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.topic.detail.title">Topic</Translate> [<b>{topicEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="smartcpdv1App.topic.name">Name</Translate>
              </span>
            </dt>
            <dd>{topicEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="smartcpdv1App.topic.description">Description</Translate>
              </span>
            </dt>
            <dd>{topicEntity.description}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="smartcpdv1App.topic.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {topicEntity.image ? (
                <div>
                  <a onClick={openFile(topicEntity.imageContentType, topicEntity.image)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {topicEntity.imageContentType}, {byteSize(topicEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/topic" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/topic/${topicEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ topic }: IRootState) => ({
  topicEntity: topic.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicDetail);
