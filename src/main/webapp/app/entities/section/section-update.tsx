import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuiz } from 'app/shared/model/quiz.model';
import { getEntities as getQuizzes } from 'app/entities/quiz/quiz.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './section.reducer';
import { ISection } from 'app/shared/model/section.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISectionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ISectionUpdateState {
  isNew: boolean;
  quizId: number;
  courseId: number;
}

export class SectionUpdate extends React.Component<ISectionUpdateProps, ISectionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      quizId: 0,
      courseId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getQuizzes();
    this.props.getCourses();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { sectionEntity } = this.props;
      const entity = {
        ...sectionEntity,
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
    this.props.history.push('/entity/section');
  };

  render() {
    const { sectionEntity, quizzes, courses, loading, updating } = this.props;
    const { isNew } = this.state;

    const { content, contentContentType } = sectionEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.section.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.section.home.createOrEditLabel">Create or edit a Section</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : sectionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="section-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="smartcpdv1App.section.name">Name</Translate>
                  </Label>
                  <AvField
                    id="section-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    <Translate contentKey="smartcpdv1App.section.notes">Notes</Translate>
                  </Label>
                  <AvField id="section-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label id="normSectionLabel" for="normSection">
                    <Translate contentKey="smartcpdv1App.section.normSection">Norm Section</Translate>
                  </Label>
                  <AvField id="section-normSection" type="text" name="normSection" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="contentLabel" for="content">
                      <Translate contentKey="smartcpdv1App.section.content">Content</Translate>
                    </Label>
                    <br />
                    {content ? (
                      <div>
                        <a onClick={openFile(contentContentType, content)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {contentContentType}, {byteSize(content)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('content')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_content" type="file" onChange={this.onBlobChange(false, 'content')} />
                    <AvInput
                      type="hidden"
                      name="content"
                      value={content}
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="quiz.name">
                    <Translate contentKey="smartcpdv1App.section.quiz">Quiz</Translate>
                  </Label>
                  <AvInput id="section-quiz" type="select" className="form-control" name="quiz.id">
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
                <AvGroup>
                  <Label for="course.normCourses">
                    <Translate contentKey="smartcpdv1App.section.course">Course</Translate>
                  </Label>
                  <AvInput id="section-course" type="select" className="form-control" name="course.id">
                    <option value="" key="0" />
                    {courses
                      ? courses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.normCourses}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/section" replace color="info">
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
  courses: storeState.course.entities,
  sectionEntity: storeState.section.entity,
  loading: storeState.section.loading,
  updating: storeState.section.updating
});

const mapDispatchToProps = {
  getQuizzes,
  getCourses,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdate);
