import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './question-history.reducer';
import { IQuestionHistory } from 'app/shared/model/question-history.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestionHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class QuestionHistoryDetail extends React.Component<IQuestionHistoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { questionHistoryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.questionHistory.detail.title">QuestionHistory</Translate> [<b>
              {questionHistoryEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="timestamp">
                <Translate contentKey="smartcpdv1App.questionHistory.timestamp">Timestamp</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={questionHistoryEntity.timestamp} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="correct">
                <Translate contentKey="smartcpdv1App.questionHistory.correct">Correct</Translate>
              </span>
            </dt>
            <dd>{questionHistoryEntity.correct ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.questionHistory.customer">Customer</Translate>
            </dt>
            <dd>{questionHistoryEntity.customer ? questionHistoryEntity.customer.normalized : ''}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.questionHistory.question">Question</Translate>
            </dt>
            <dd>{questionHistoryEntity.question ? questionHistoryEntity.question.textQuestion : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/question-history" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/question-history/${questionHistoryEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ questionHistory }: IRootState) => ({
  questionHistoryEntity: questionHistory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionHistoryDetail);
