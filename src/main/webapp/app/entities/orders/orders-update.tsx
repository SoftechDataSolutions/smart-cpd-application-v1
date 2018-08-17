import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICart } from 'app/shared/model/cart.model';
import { getEntities as getCarts } from 'app/entities/cart/cart.reducer';
import { getEntity, updateEntity, createEntity, reset } from './orders.reducer';
import { IOrders } from 'app/shared/model/orders.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrdersUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IOrdersUpdateState {
  isNew: boolean;
  cartId: number;
}

export class OrdersUpdate extends React.Component<IOrdersUpdateProps, IOrdersUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cartId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCarts();
  }

  saveEntity = (event, errors, values) => {
    values.createddate = new Date(values.createddate);

    if (errors.length === 0) {
      const { ordersEntity } = this.props;
      const entity = {
        ...ordersEntity,
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
    this.props.history.push('/entity/orders');
  };

  render() {
    const { ordersEntity, carts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.orders.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.orders.home.createOrEditLabel">Create or edit a Orders</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : ordersEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="orders-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createddateLabel" for="createddate">
                    <Translate contentKey="smartcpdv1App.orders.createddate">Createddate</Translate>
                  </Label>
                  <AvInput
                    id="orders-createddate"
                    type="datetime-local"
                    className="form-control"
                    name="createddate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.ordersEntity.createddate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="amount">
                    <Translate contentKey="smartcpdv1App.orders.amount">Amount</Translate>
                  </Label>
                  <AvField id="orders-amount" type="number" className="form-control" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="smartcpdv1App.orders.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="orders-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && ordersEntity.status) || 'ORDERPROCESSING'}
                  >
                    <option value="ORDERPROCESSING">
                      <Translate contentKey="smartcpdv1App.NOTIFICATIONS.ORDERPROCESSING" />
                    </option>
                    <option value="COMPLETE">
                      <Translate contentKey="smartcpdv1App.NOTIFICATIONS.COMPLETE" />
                    </option>
                    <option value="CANCELLLED">
                      <Translate contentKey="smartcpdv1App.NOTIFICATIONS.CANCELLLED" />
                    </option>
                    <option value="REFUND">
                      <Translate contentKey="smartcpdv1App.NOTIFICATIONS.REFUND" />
                    </option>
                    <option value="ONHOLD">
                      <Translate contentKey="smartcpdv1App.NOTIFICATIONS.ONHOLD" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="paymentLabel">
                    <Translate contentKey="smartcpdv1App.orders.payment">Payment</Translate>
                  </Label>
                  <AvInput
                    id="orders-payment"
                    type="select"
                    className="form-control"
                    name="payment"
                    value={(!isNew && ordersEntity.payment) || 'PAYPAL'}
                  >
                    <option value="PAYPAL">
                      <Translate contentKey="smartcpdv1App.PAYMENT.PAYPAL" />
                    </option>
                    <option value="STRIPE">
                      <Translate contentKey="smartcpdv1App.PAYMENT.STRIPE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="cart.normCart">
                    <Translate contentKey="smartcpdv1App.orders.cart">Cart</Translate>
                  </Label>
                  <AvInput id="orders-cart" type="select" className="form-control" name="cart.id">
                    <option value="" key="0" />
                    {carts
                      ? carts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.normCart}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/orders" replace color="info">
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
  carts: storeState.cart.entities,
  ordersEntity: storeState.orders.entity,
  loading: storeState.orders.loading,
  updating: storeState.orders.updating
});

const mapDispatchToProps = {
  getCarts,
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
)(OrdersUpdate);
