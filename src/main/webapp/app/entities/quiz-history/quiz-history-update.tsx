import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { IQuiz } from 'app/shared/model/quiz.model';
import { getEntities as getQuizzes } from 'app/entities/quiz/quiz.reducer';
import { getEntity, updateEntity, createEntity, reset } from './quiz-history.reducer';
import { IQuizHistory } from 'app/shared/model/quiz-history.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuizHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IQuizHistoryUpdateState {
  isNew: boolean;
  customerId: number;
  quizId: number;
}

export class QuizHistoryUpdate extends React.Component<IQuizHistoryUpdateProps, IQuizHistoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      quizId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
    this.props.getQuizzes();
  }

  saveEntity = (event, errors, values) => {
    values.start = new Date(values.start);

    if (errors.length === 0) {
      const { quizHistoryEntity } = this.props;
      const entity = {
        ...quizHistoryEntity,
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
    this.props.history.push('/entity/quiz-history');
  };

  render() {
    const { quizHistoryEntity, customers, quizzes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.quizHistory.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.quizHistory.home.createOrEditLabel">Create or edit a QuizHistory</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : quizHistoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="quiz-history-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startLabel" for="start">
                    <Translate contentKey="smartcpdv1App.quizHistory.start">Start</Translate>
                  </Label>
                  <AvInput
                    id="quiz-history-start"
                    type="datetime-local"
                    className="form-control"
                    name="start"
                    value={isNew ? null : convertDateTimeFromServer(this.props.quizHistoryEntity.start)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="passedLabel" check>
                    <AvInput id="quiz-history-passed" type="checkbox" className="form-control" name="passed" />
                    <Translate contentKey="smartcpdv1App.quizHistory.passed">Passed</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.normalized">
                    <Translate contentKey="smartcpdv1App.quizHistory.customer">Customer</Translate>
                  </Label>
                  <AvInput id="quiz-history-customer" type="select" className="form-control" name="customer.id">
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.normalized}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="quiz.name">
                    <Translate contentKey="smartcpdv1App.quizHistory.quiz">Quiz</Translate>
                  </Label>
                  <AvInput id="quiz-history-quiz" type="select" className="form-control" name="quiz.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/quiz-history" replace color="info">
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
  customers: storeState.customer.entities,
  quizzes: storeState.quiz.entities,
  quizHistoryEntity: storeState.quizHistory.entity,
  loading: storeState.quizHistory.loading,
  updating: storeState.quizHistory.updating
});

const mapDispatchToProps = {
  getCustomers,
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
)(QuizHistoryUpdate);
