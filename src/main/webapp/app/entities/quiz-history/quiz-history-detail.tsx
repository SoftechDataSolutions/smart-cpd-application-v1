import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quiz-history.reducer';
import { IQuizHistory } from 'app/shared/model/quiz-history.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuizHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class QuizHistoryDetail extends React.Component<IQuizHistoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { quizHistoryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.quizHistory.detail.title">QuizHistory</Translate> [<b>{quizHistoryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="start">
                <Translate contentKey="smartcpdv1App.quizHistory.start">Start</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={quizHistoryEntity.start} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="passed">
                <Translate contentKey="smartcpdv1App.quizHistory.passed">Passed</Translate>
              </span>
            </dt>
            <dd>{quizHistoryEntity.passed ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.quizHistory.customer">Customer</Translate>
            </dt>
            <dd>{quizHistoryEntity.customer ? quizHistoryEntity.customer.normalized : ''}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.quizHistory.quiz">Quiz</Translate>
            </dt>
            <dd>{quizHistoryEntity.quiz ? quizHistoryEntity.quiz.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/quiz-history" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/quiz-history/${quizHistoryEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ quizHistory }: IRootState) => ({
  quizHistoryEntity: quizHistory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizHistoryDetail);
