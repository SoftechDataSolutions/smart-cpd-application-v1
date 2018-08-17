import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITopic } from 'app/shared/model/topic.model';
import { getEntities as getTopics } from 'app/entities/topic/topic.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './course.reducer';
import { ICourse } from 'app/shared/model/course.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICourseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICourseUpdateState {
  isNew: boolean;
  topicId: number;
}

export class CourseUpdate extends React.Component<ICourseUpdateProps, ICourseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      topicId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTopics();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.startdate = new Date(values.startdate);
    values.enddate = new Date(values.enddate);

    if (errors.length === 0) {
      const { courseEntity } = this.props;
      const entity = {
        ...courseEntity,
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
    this.props.history.push('/entity/course');
  };

  render() {
    const { courseEntity, topics, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = courseEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.course.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.course.home.createOrEditLabel">Create or edit a Course</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : courseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="course-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="smartcpdv1App.course.title">Title</Translate>
                  </Label>
                  <AvField
                    id="course-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="sectionLabel" for="section">
                    <Translate contentKey="smartcpdv1App.course.section">Section</Translate>
                  </Label>
                  <AvField
                    id="course-section"
                    type="text"
                    name="section"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="normCoursesLabel" for="normCourses">
                    <Translate contentKey="smartcpdv1App.course.normCourses">Norm Courses</Translate>
                  </Label>
                  <AvField id="course-normCourses" type="text" name="normCourses" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="smartcpdv1App.course.description">Description</Translate>
                  </Label>
                  <AvField
                    id="course-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="amount">
                    <Translate contentKey="smartcpdv1App.course.amount">Amount</Translate>
                  </Label>
                  <AvField
                    id="course-amount"
                    type="number"
                    className="form-control"
                    name="amount"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="smartcpdv1App.course.image">Image</Translate>
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(false, 'image')} />
                    <AvInput
                      type="hidden"
                      name="image"
                      value={image}
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="startdateLabel" for="startdate">
                    <Translate contentKey="smartcpdv1App.course.startdate">Startdate</Translate>
                  </Label>
                  <AvInput
                    id="course-startdate"
                    type="datetime-local"
                    className="form-control"
                    name="startdate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.courseEntity.startdate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="enddateLabel" for="enddate">
                    <Translate contentKey="smartcpdv1App.course.enddate">Enddate</Translate>
                  </Label>
                  <AvInput
                    id="course-enddate"
                    type="datetime-local"
                    className="form-control"
                    name="enddate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.courseEntity.enddate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="pointLabel" for="point">
                    <Translate contentKey="smartcpdv1App.course.point">Point</Translate>
                  </Label>
                  <AvField id="course-point" type="number" className="form-control" name="point" />
                </AvGroup>
                <AvGroup>
                  <Label id="creditLabel" for="credit">
                    <Translate contentKey="smartcpdv1App.course.credit">Credit</Translate>
                  </Label>
                  <AvField
                    id="course-credit"
                    type="text"
                    name="credit"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="country">
                    <Translate contentKey="smartcpdv1App.course.country">Country</Translate>
                  </Label>
                  <AvField
                    id="course-country"
                    type="text"
                    name="country"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="stateLabel" for="state">
                    <Translate contentKey="smartcpdv1App.course.state">State</Translate>
                  </Label>
                  <AvField
                    id="course-state"
                    type="text"
                    name="state"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="topic.name">
                    <Translate contentKey="smartcpdv1App.course.topic">Topic</Translate>
                  </Label>
                  <AvInput id="course-topic" type="select" className="form-control" name="topic.id">
                    <option value="" key="0" />
                    {topics
                      ? topics.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/course" replace color="info">
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
  topics: storeState.topic.entities,
  courseEntity: storeState.course.entity,
  loading: storeState.course.loading,
  updating: storeState.course.updating
});

const mapDispatchToProps = {
  getTopics,
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
)(CourseUpdate);
