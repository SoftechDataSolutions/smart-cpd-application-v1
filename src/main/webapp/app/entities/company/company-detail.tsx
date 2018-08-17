import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CompanyDetail extends React.Component<ICompanyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { companyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.company.detail.title">Company</Translate> [<b>{companyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="smartcpdv1App.company.name">Name</Translate>
              </span>
            </dt>
            <dd>{companyEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="smartcpdv1App.company.description">Description</Translate>
              </span>
            </dt>
            <dd>{companyEntity.description}</dd>
            <dt>
              <span id="notes">
                <Translate contentKey="smartcpdv1App.company.notes">Notes</Translate>
              </span>
            </dt>
            <dd>{companyEntity.notes}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="smartcpdv1App.company.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{companyEntity.phone}</dd>
            <dt>
              <span id="streetAddress">
                <Translate contentKey="smartcpdv1App.company.streetAddress">Street Address</Translate>
              </span>
            </dt>
            <dd>{companyEntity.streetAddress}</dd>
            <dt>
              <span id="postalCode">
                <Translate contentKey="smartcpdv1App.company.postalCode">Postal Code</Translate>
              </span>
            </dt>
            <dd>{companyEntity.postalCode}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="smartcpdv1App.company.city">City</Translate>
              </span>
            </dt>
            <dd>{companyEntity.city}</dd>
            <dt>
              <span id="stateProvince">
                <Translate contentKey="smartcpdv1App.company.stateProvince">State Province</Translate>
              </span>
            </dt>
            <dd>{companyEntity.stateProvince}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="smartcpdv1App.company.country">Country</Translate>
              </span>
            </dt>
            <dd>{companyEntity.country}</dd>
            <dt>
              <span id="cycledate">
                <Translate contentKey="smartcpdv1App.company.cycledate">Cycledate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={companyEntity.cycledate} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/company" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/company/${companyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDetail);
