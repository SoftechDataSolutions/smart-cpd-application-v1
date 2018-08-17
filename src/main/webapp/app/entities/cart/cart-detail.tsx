import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cart.reducer';
import { ICart } from 'app/shared/model/cart.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICartDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CartDetail extends React.Component<ICartDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cartEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartcpdv1App.cart.detail.title">Cart</Translate> [<b>{cartEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="normCart">
                <Translate contentKey="smartcpdv1App.cart.normCart">Norm Cart</Translate>
              </span>
            </dt>
            <dd>{cartEntity.normCart}</dd>
            <dt>
              <span id="createddate">
                <Translate contentKey="smartcpdv1App.cart.createddate">Createddate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cartEntity.createddate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastactivedate">
                <Translate contentKey="smartcpdv1App.cart.lastactivedate">Lastactivedate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cartEntity.lastactivedate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="amount">
                <Translate contentKey="smartcpdv1App.cart.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{cartEntity.amount}</dd>
            <dt>
              <span id="checkout">
                <Translate contentKey="smartcpdv1App.cart.checkout">Checkout</Translate>
              </span>
            </dt>
            <dd>{cartEntity.checkout ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="smartcpdv1App.cart.customer">Customer</Translate>
            </dt>
            <dd>{cartEntity.customer ? cartEntity.customer.normalized : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/cart" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/cart/${cartEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cart }: IRootState) => ({
  cartEntity: cart.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDetail);
