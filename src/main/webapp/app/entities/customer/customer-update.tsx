import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICustomerUpdateState {
  isNew: boolean;
  companyId: number;
}

export class CustomerUpdate extends React.Component<ICustomerUpdateProps, ICustomerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      companyId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCompanies();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.registered = new Date(values.registered);
    values.lastactive = new Date(values.lastactive);
    values.cycledate = new Date(values.cycledate);

    if (errors.length === 0) {
      const { customerEntity } = this.props;
      const entity = {
        ...customerEntity,
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
    this.props.history.push('/entity/customer');
  };

  render() {
    const { customerEntity, companies, loading, updating } = this.props;
    const { isNew } = this.state;

    const { profilePic, profilePicContentType } = customerEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.customer.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="normalizedLabel" for="normalized">
                    <Translate contentKey="smartcpdv1App.customer.normalized">Normalized</Translate>
                  </Label>
                  <AvField id="customer-normalized" type="text" name="normalized" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="smartcpdv1App.customer.phone">Phone</Translate>
                  </Label>
                  <AvField
                    id="customer-phone"
                    type="text"
                    name="phone"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      pattern: {
                        value: '^(?([0-9]{3}))?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$',
                        errorMessage: translate('entity.validation.pattern', {
                          pattern: '^(?([0-9]{3}))?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$'
                        })
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="streetaddressLabel" for="streetaddress">
                    <Translate contentKey="smartcpdv1App.customer.streetaddress">Streetaddress</Translate>
                  </Label>
                  <AvField
                    id="customer-streetaddress"
                    type="text"
                    name="streetaddress"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="postalcodeLabel" for="postalcode">
                    <Translate contentKey="smartcpdv1App.customer.postalcode">Postalcode</Translate>
                  </Label>
                  <AvField
                    id="customer-postalcode"
                    type="text"
                    name="postalcode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      pattern: {
                        value: '^d{5}-d{4}|d{5}|[A-Z]d[A-Z] d[A-Z]d$',
                        errorMessage: translate('entity.validation.pattern', { pattern: '^d{5}-d{4}|d{5}|[A-Z]d[A-Z] d[A-Z]d$' })
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    <Translate contentKey="smartcpdv1App.customer.city">City</Translate>
                  </Label>
                  <AvField
                    id="customer-city"
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="stateProvinceLabel" for="stateProvince">
                    <Translate contentKey="smartcpdv1App.customer.stateProvince">State Province</Translate>
                  </Label>
                  <AvField
                    id="customer-stateProvince"
                    type="text"
                    name="stateProvince"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="country">
                    <Translate contentKey="smartcpdv1App.customer.country">Country</Translate>
                  </Label>
                  <AvField
                    id="customer-country"
                    type="text"
                    name="country"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="profilePicLabel" for="profilePic">
                      <Translate contentKey="smartcpdv1App.customer.profilePic">Profile Pic</Translate>
                    </Label>
                    <br />
                    {profilePic ? (
                      <div>
                        <a onClick={openFile(profilePicContentType, profilePic)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {profilePicContentType}, {byteSize(profilePic)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('profilePic')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_profilePic" type="file" onChange={this.onBlobChange(false, 'profilePic')} />
                    <AvInput type="hidden" name="profilePic" value={profilePic} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="registeredLabel" for="registered">
                    <Translate contentKey="smartcpdv1App.customer.registered">Registered</Translate>
                  </Label>
                  <AvInput
                    id="customer-registered"
                    type="datetime-local"
                    className="form-control"
                    name="registered"
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerEntity.registered)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastactiveLabel" for="lastactive">
                    <Translate contentKey="smartcpdv1App.customer.lastactive">Lastactive</Translate>
                  </Label>
                  <AvInput
                    id="customer-lastactive"
                    type="datetime-local"
                    className="form-control"
                    name="lastactive"
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerEntity.lastactive)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="pointsLabel" for="points">
                    <Translate contentKey="smartcpdv1App.customer.points">Points</Translate>
                  </Label>
                  <AvField id="customer-points" type="number" className="form-control" name="points" />
                </AvGroup>
                <AvGroup>
                  <Label id="cycledateLabel" for="cycledate">
                    <Translate contentKey="smartcpdv1App.customer.cycledate">Cycledate</Translate>
                  </Label>
                  <AvInput
                    id="customer-cycledate"
                    type="datetime-local"
                    className="form-control"
                    name="cycledate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerEntity.cycledate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="areaservicedLabel" for="areaserviced">
                    <Translate contentKey="smartcpdv1App.customer.areaserviced">Areaserviced</Translate>
                  </Label>
                  <AvField id="customer-areaserviced" type="text" name="areaserviced" />
                </AvGroup>
                <AvGroup>
                  <Label id="specialitiesLabel">
                    <Translate contentKey="smartcpdv1App.customer.specialities">Specialities</Translate>
                  </Label>
                  <AvInput
                    id="customer-specialities"
                    type="select"
                    className="form-control"
                    name="specialities"
                    value={(!isNew && customerEntity.specialities) || 'RESIDENCE'}
                  >
                    <option value="RESIDENCE">
                      <Translate contentKey="smartcpdv1App.TYPES.RESIDENCE" />
                    </option>
                    <option value="COMMERCIAL">
                      <Translate contentKey="smartcpdv1App.TYPES.COMMERCIAL" />
                    </option>
                    <option value="INDUSTRIAL">
                      <Translate contentKey="smartcpdv1App.TYPES.INDUSTRIAL" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="tradesLabel" for="trades">
                    <Translate contentKey="smartcpdv1App.customer.trades">Trades</Translate>
                  </Label>
                  <AvField id="customer-trades" type="text" name="trades" />
                </AvGroup>
                <AvGroup>
                  <Label id="monthYearLabel" for="monthYear">
                    <Translate contentKey="smartcpdv1App.customer.monthYear">Month Year</Translate>
                  </Label>
                  <AvField
                    id="customer-monthYear"
                    type="text"
                    name="monthYear"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="licenseNumberLabel" for="licenseNumber">
                    <Translate contentKey="smartcpdv1App.customer.licenseNumber">License Number</Translate>
                  </Label>
                  <AvField id="customer-licenseNumber" type="text" name="licenseNumber" />
                </AvGroup>
                <AvGroup>
                  <Label for="company.name">
                    <Translate contentKey="smartcpdv1App.customer.company">Company</Translate>
                  </Label>
                  <AvInput id="customer-company" type="select" className="form-control" name="company.id">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/customer" replace color="info">
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
  companies: storeState.company.entities,
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating
});

const mapDispatchToProps = {
  getCompanies,
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
)(CustomerUpdate);
