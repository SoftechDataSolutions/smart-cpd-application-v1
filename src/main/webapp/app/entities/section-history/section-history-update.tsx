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
import { ISection } from 'app/shared/model/section.model';
import { getEntities as getSections } from 'app/entities/section/section.reducer';
import { getEntity, updateEntity, createEntity, reset } from './section-history.reducer';
import { ISectionHistory } from 'app/shared/model/section-history.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISectionHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ISectionHistoryUpdateState {
  isNew: boolean;
  customerId: number;
  sectionId: number;
}

export class SectionHistoryUpdate extends React.Component<ISectionHistoryUpdateProps, ISectionHistoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      sectionId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
    this.props.getSections();
  }

  saveEntity = (event, errors, values) => {
    values.startdate = new Date(values.startdate);
    values.lastactivedate = new Date(values.lastactivedate);

    if (errors.length === 0) {
      const { sectionHistoryEntity } = this.props;
      const entity = {
        ...sectionHistoryEntity,
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
    this.props.history.push('/entity/section-history');
  };

  render() {
    const { sectionHistoryEntity, customers, sections, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.sectionHistory.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.sectionHistory.home.createOrEditLabel">Create or edit a SectionHistory</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : sectionHistoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="section-history-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startdateLabel" for="startdate">
                    <Translate contentKey="smartcpdv1App.sectionHistory.startdate">Startdate</Translate>
                  </Label>
                  <AvInput
                    id="section-history-startdate"
                    type="datetime-local"
                    className="form-control"
                    name="startdate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.sectionHistoryEntity.startdate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastactivedateLabel" for="lastactivedate">
                    <Translate contentKey="smartcpdv1App.sectionHistory.lastactivedate">Lastactivedate</Translate>
                  </Label>
                  <AvInput
                    id="section-history-lastactivedate"
                    type="datetime-local"
                    className="form-control"
                    name="lastactivedate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.sectionHistoryEntity.lastactivedate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="watchedLabel" check>
                    <AvInput id="section-history-watched" type="checkbox" className="form-control" name="watched" />
                    <Translate contentKey="smartcpdv1App.sectionHistory.watched">Watched</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.normalized">
                    <Translate contentKey="smartcpdv1App.sectionHistory.customer">Customer</Translate>
                  </Label>
                  <AvInput id="section-history-customer" type="select" className="form-control" name="customer.id">
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
                  <Label for="section.normSection">
                    <Translate contentKey="smartcpdv1App.sectionHistory.section">Section</Translate>
                  </Label>
                  <AvInput id="section-history-section" type="select" className="form-control" name="section.id">
                    <option value="" key="0" />
                    {sections
                      ? sections.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.normSection}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/section-history" replace color="info">
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
  sections: storeState.section.entities,
  sectionHistoryEntity: storeState.sectionHistory.entity,
  loading: storeState.sectionHistory.loading,
  updating: storeState.sectionHistory.updating
});

const mapDispatchToProps = {
  getCustomers,
  getSections,
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
)(SectionHistoryUpdate);
