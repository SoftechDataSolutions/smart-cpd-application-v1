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
import { IQuestion } from 'app/shared/model/question.model';
import { getEntities as getQuestions } from 'app/entities/question/question.reducer';
import { getEntity, updateEntity, createEntity, reset } from './question-history.reducer';
import { IQuestionHistory } from 'app/shared/model/question-history.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestionHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IQuestionHistoryUpdateState {
  isNew: boolean;
  customerId: number;
  questionId: number;
}

export class QuestionHistoryUpdate extends React.Component<IQuestionHistoryUpdateProps, IQuestionHistoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      questionId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
    this.props.getQuestions();
  }

  saveEntity = (event, errors, values) => {
    values.timestamp = new Date(values.timestamp);

    if (errors.length === 0) {
      const { questionHistoryEntity } = this.props;
      const entity = {
        ...questionHistoryEntity,
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
    this.props.history.push('/entity/question-history');
  };

  render() {
    const { questionHistoryEntity, customers, questions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.questionHistory.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.questionHistory.home.createOrEditLabel">Create or edit a QuestionHistory</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : questionHistoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="question-history-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="timestampLabel" for="timestamp">
                    <Translate contentKey="smartcpdv1App.questionHistory.timestamp">Timestamp</Translate>
                  </Label>
                  <AvInput
                    id="question-history-timestamp"
                    type="datetime-local"
                    className="form-control"
                    name="timestamp"
                    value={isNew ? null : convertDateTimeFromServer(this.props.questionHistoryEntity.timestamp)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="correctLabel" check>
                    <AvInput id="question-history-correct" type="checkbox" className="form-control" name="correct" />
                    <Translate contentKey="smartcpdv1App.questionHistory.correct">Correct</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.normalized">
                    <Translate contentKey="smartcpdv1App.questionHistory.customer">Customer</Translate>
                  </Label>
                  <AvInput id="question-history-customer" type="select" className="form-control" name="customer.id">
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
                  <Label for="question.textQuestion">
                    <Translate contentKey="smartcpdv1App.questionHistory.question">Question</Translate>
                  </Label>
                  <AvInput id="question-history-question" type="select" className="form-control" name="question.id">
                    <option value="" key="0" />
                    {questions
                      ? questions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.textQuestion}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/question-history" replace color="info">
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
  questions: storeState.question.entities,
  questionHistoryEntity: storeState.questionHistory.entity,
  loading: storeState.questionHistory.loading,
  updating: storeState.questionHistory.updating
});

const mapDispatchToProps = {
  getCustomers,
  getQuestions,
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
)(QuestionHistoryUpdate);
