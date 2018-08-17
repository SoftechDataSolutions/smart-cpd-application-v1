import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './orders.reducer';
import { IOrders } from 'app/shared/model/orders.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrdersDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class OrdersDetail extends React.Component<IOrdersDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ordersEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.orders.detail.title">Orders</Translate> [<b>{ordersEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createddate">
                <Translate contentKey="smartcpdv1App.orders.createddate">Createddate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={ordersEntity.createddate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="amount">
                <Translate contentKey="smartcpdv1App.orders.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{ordersEntity.amount}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="smartcpdv1App.orders.status">Status</Translate>
              </span>
            </dt>
            <dd>{ordersEntity.status}</dd>
            <dt>
              <span id="payment">
                <Translate contentKey="smartcpdv1App.orders.payment">Payment</Translate>
              </span>
            </dt>
            <dd>{ordersEntity.payment}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.orders.cart">Cart</Translate>
            </dt>
            <dd>{ordersEntity.cart ? ordersEntity.cart.normCart : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/orders" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/orders/${ordersEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ orders }: IRootState) => ({
  ordersEntity: orders.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersDetail);
