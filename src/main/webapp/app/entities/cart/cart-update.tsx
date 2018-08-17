import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cart.reducer';
import { ICart } from 'app/shared/model/cart.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICartUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICartUpdateState {
  isNew: boolean;
  customerId: number;
}

export class CartUpdate extends React.Component<ICartUpdateProps, ICartUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
  }

  saveEntity = (event, errors, values) => {
    values.createddate = new Date(values.createddate);
    values.lastactivedate = new Date(values.lastactivedate);

    if (errors.length === 0) {
      const { cartEntity } = this.props;
      const entity = {
        ...cartEntity,
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
    this.props.history.push('/entity/cart');
  };

  render() {
    const { cartEntity, customers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartcpdv1App.cart.home.createOrEditLabel">
              <Translate contentKey="smartcpdv1App.cart.home.createOrEditLabel">Create or edit a Cart</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cartEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="cart-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="normCartLabel" for="normCart">
                    <Translate contentKey="smartcpdv1App.cart.normCart">Norm Cart</Translate>
                  </Label>
                  <AvField id="cart-normCart" type="text" name="normCart" />
                </AvGroup>
                <AvGroup>
                  <Label id="createddateLabel" for="createddate">
                    <Translate contentKey="smartcpdv1App.cart.createddate">Createddate</Translate>
                  </Label>
                  <AvInput
                    id="cart-createddate"
                    type="datetime-local"
                    className="form-control"
                    name="createddate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.cartEntity.createddate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastactivedateLabel" for="lastactivedate">
                    <Translate contentKey="smartcpdv1App.cart.lastactivedate">Lastactivedate</Translate>
                  </Label>
                  <AvInput
                    id="cart-lastactivedate"
                    type="datetime-local"
                    className="form-control"
                    name="lastactivedate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.cartEntity.lastactivedate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="amount">
                    <Translate contentKey="smartcpdv1App.cart.amount">Amount</Translate>
                  </Label>
                  <AvField id="cart-amount" type="number" className="form-control" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="checkoutLabel" check>
                    <AvInput id="cart-checkout" type="checkbox" className="form-control" name="checkout" />
                    <Translate contentKey="smartcpdv1App.cart.checkout">Checkout</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.normalized">
                    <Translate contentKey="smartcpdv1App.cart.customer">Customer</Translate>
                  </Label>
                  <AvInput id="cart-customer" type="select" className="form-control" name="customer.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/cart" replace color="info">
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
  cartEntity: storeState.cart.entity,
  loading: storeState.cart.loading,
  updating: storeState.cart.updating
});

const mapDispatchToProps = {
  getCustomers,
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
)(CartUpdate);
