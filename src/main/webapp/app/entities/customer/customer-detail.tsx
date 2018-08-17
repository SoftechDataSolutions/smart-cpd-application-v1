import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CustomerDetail extends React.Component<ICustomerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="normalized">
                <Translate contentKey="smartcpdv1App.customer.normalized">Normalized</Translate>
              </span>
            </dt>
            <dd>{customerEntity.normalized}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="smartcpdv1App.customer.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{customerEntity.phone}</dd>
            <dt>
              <span id="streetaddress">
                <Translate contentKey="smartcpdv1App.customer.streetaddress">Streetaddress</Translate>
              </span>
            </dt>
            <dd>{customerEntity.streetaddress}</dd>
            <dt>
              <span id="postalcode">
                <Translate contentKey="smartcpdv1App.customer.postalcode">Postalcode</Translate>
              </span>
            </dt>
            <dd>{customerEntity.postalcode}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="smartcpdv1App.customer.city">City</Translate>
              </span>
            </dt>
            <dd>{customerEntity.city}</dd>
            <dt>
              <span id="stateProvince">
                <Translate contentKey="smartcpdv1App.customer.stateProvince">State Province</Translate>
              </span>
            </dt>
            <dd>{customerEntity.stateProvince}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="smartcpdv1App.customer.country">Country</Translate>
              </span>
            </dt>
            <dd>{customerEntity.country}</dd>
            <dt>
              <span id="profilePic">
                <Translate contentKey="smartcpdv1App.customer.profilePic">Profile Pic</Translate>
              </span>
            </dt>
            <dd>
              {customerEntity.profilePic ? (
                <div>
                  <a onClick={openFile(customerEntity.profilePicContentType, customerEntity.profilePic)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {customerEntity.profilePicContentType}, {byteSize(customerEntity.profilePic)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="registered">
                <Translate contentKey="smartcpdv1App.customer.registered">Registered</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={customerEntity.registered} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastactive">
                <Translate contentKey="smartcpdv1App.customer.lastactive">Lastactive</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={customerEntity.lastactive} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="points">
                <Translate contentKey="smartcpdv1App.customer.points">Points</Translate>
              </span>
            </dt>
            <dd>{customerEntity.points}</dd>
            <dt>
              <span id="cycledate">
                <Translate contentKey="smartcpdv1App.customer.cycledate">Cycledate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={customerEntity.cycledate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="areaserviced">
                <Translate contentKey="smartcpdv1App.customer.areaserviced">Areaserviced</Translate>
              </span>
            </dt>
            <dd>{customerEntity.areaserviced}</dd>
            <dt>
              <span id="specialities">
                <Translate contentKey="smartcpdv1App.customer.specialities">Specialities</Translate>
              </span>
            </dt>
            <dd>{customerEntity.specialities}</dd>
            <dt>
              <span id="trades">
                <Translate contentKey="smartcpdv1App.customer.trades">Trades</Translate>
              </span>
            </dt>
            <dd>{customerEntity.trades}</dd>
            <dt>
              <span id="monthYear">
                <Translate contentKey="smartcpdv1App.customer.monthYear">Month Year</Translate>
              </span>
            </dt>
            <dd>{customerEntity.monthYear}</dd>
            <dt>
              <span id="licenseNumber">
                <Translate contentKey="smartcpdv1App.customer.licenseNumber">License Number</Translate>
              </span>
            </dt>
            <dd>{customerEntity.licenseNumber}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.customer.company">Company</Translate>
            </dt>
            <dd>{customerEntity.company ? customerEntity.company.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/customer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/customer/${customerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetail);
