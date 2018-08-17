import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuiz } from 'app/shared/model/quiz.model';
import { getEntities as getQuizzes } from 'app/entities/quiz/quiz.reducer';
import { getEntity, updateEntity, createEntity, reset } from './question.reducer';
import { IQuestion } from 'app/shared/model/question.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IQuestionUpdateState {
  isNew: boolean;
  quizId: number;
}

export class QuestionUpdate extends React.Component<IQuestionUpdateProps, IQuestionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      quizId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getQuizzes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { questionEntity } = this.props;
      const entity = {
        ...questionEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/question');
  };

  render() {
    const { questionEntity, quizzes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.question.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.question.home.createOrEditLabel">Create or edit a Question</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : questionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="question-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="textQuestionLabel" for="textQuestion">
                    <Translate contentKey="smartcpdv1App.question.textQuestion">Text Question</Translate>
                  </Label>
                  <AvField
                    id="question-textQuestion"
                    type="text"
                    name="textQuestion"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="difficultyLabel" for="difficulty">
                    <Translate contentKey="smartcpdv1App.question.difficulty">Difficulty</Translate>
                  </Label>
                  <AvField id="question-difficulty" type="text" name="difficulty" />
                </AvGroup>
                <AvGroup>
                  <Label for="quiz.name">
                    <Translate contentKey="smartcpdv1App.question.quiz">Quiz</Translate>
                  </Label>
                  <AvInput id="question-quiz" type="select" className="form-control" name="quiz.id">
                    <option value="" key="0" />
                    {quizzes
                      ? quizzes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/question" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  quizzes: storeState.quiz.entities,
  questionEntity: storeState.question.entity,
  loading: storeState.question.loading,
  updating: storeState.question.updating
});

const mapDispatchToProps = {
  getQuizzes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionUpdate);
