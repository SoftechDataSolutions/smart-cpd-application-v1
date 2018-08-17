import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './choice.reducer';
import { IChoice } from 'app/shared/model/choice.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChoiceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ChoiceDetail extends React.Component<IChoiceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { choiceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.choice.detail.title">Choice</Translate> [<b>{choiceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="textChoice">
                <Translate contentKey="smartcpdv1App.choice.textChoice">Text Choice</Translate>
              </span>
            </dt>
            <dd>{choiceEntity.textChoice}</dd>
            <dt>
              <span id="isanswer">
                <Translate contentKey="smartcpdv1App.choice.isanswer">Isanswer</Translate>
              </span>
            </dt>
            <dd>{choiceEntity.isanswer ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.choice.question">Question</Translate>
            </dt>
            <dd>{choiceEntity.question ? choiceEntity.question.textQuestion : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/choice" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/choice/${choiceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ choice }: IRootState) => ({
  choiceEntity: choice.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoiceDetail);
