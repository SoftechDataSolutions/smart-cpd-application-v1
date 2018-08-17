import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quiz.reducer';
import { IQuiz } from 'app/shared/model/quiz.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuizDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class QuizDetail extends React.Component<IQuizDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { quizEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.quiz.detail.title">Quiz</Translate> [<b>{quizEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="smartcpdv1App.quiz.name">Name</Translate>
              </span>
            </dt>
            <dd>{quizEntity.name}</dd>
            <dt>
              <span id="difficulty">
                <Translate contentKey="smartcpdv1App.quiz.difficulty">Difficulty</Translate>
              </span>
            </dt>
            <dd>{quizEntity.difficulty}</dd>
            <dt>
              <span id="passingscore">
                <Translate contentKey="smartcpdv1App.quiz.passingscore">Passingscore</Translate>
              </span>
            </dt>
            <dd>{quizEntity.passingscore}</dd>
          </dl>
          <Button tag={Link} to="/entity/quiz" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/quiz/${quizEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ quiz }: IRootState) => ({
  quizEntity: quiz.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizDetail);
